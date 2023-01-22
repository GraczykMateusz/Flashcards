import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {Flashcard} from '../../../services/flashcards/model/flashcard';
import {MatTableDataSource} from '@angular/material/table';
import {FlashcardsService} from '../../../services/flashcards/flashcards.service';
import {AuthService} from '../../../services/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {map, take} from 'rxjs';
import {RemoveFlashcardDialogComponent} from './remove-flashcard-dialog/remove-flashcard-dialog.component';
import {ModifyFlashcardDialogComponent} from './new-flashcard-dialog/modify-flashcard-dialog/modify-flashcard-dialog.component';
import {AddFlashcardDialogComponent} from './new-flashcard-dialog/add-flashcard-dialog/add-flashcard-dialog.component';

@Component({
  selector: 'app-flashcards-editor',
  templateUrl: './flashcards-editor.component.html',
  styleUrls: ['./flashcards-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlashcardsEditorComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading = true;
  flashcards: Flashcard[] = [];
  dataSource = new MatTableDataSource<Flashcard>();
  displayedColumns: string[] = ['content', 'translation', 'image-and-example', 'action'];

  constructor(private flashcardsService: FlashcardsService,
              private auth: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.auth.getUser()
      .pipe(take(1), map(user => user?.email))
      .subscribe(email => {
        if (email) {
          this.auth.email = email;
          this.flashcardsService.getFlashcards()
            .pipe(take(1))
            .subscribe(flashcards => {
              this.flashcards = flashcards;
              this.dataSource = new MatTableDataSource<Flashcard>(this.flashcards);
              this.dataSource.paginator = this.paginator;
              this.loading = false;
            });
        } else {
          this.router.navigateByUrl('/login').then();
        }
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addFlashcard() {
    this.dialog.open(AddFlashcardDialogComponent, {
      disableClose: true,
      panelClass: 'custom-add-flashcard-dialog-container'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.flashcards.unshift(result.result as Flashcard);
        this.dataSource = new MatTableDataSource<Flashcard>(this.flashcards);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  deleteFlashcard(flashcardForRemoval: Flashcard) {
    this.dialog.open(RemoveFlashcardDialogComponent, {
      data: flashcardForRemoval,
      disableClose: true,
      panelClass: 'custom-remove-flashcard-dialog-container'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.flashcards = this.flashcards.filter(flashcard => flashcard.id !== flashcardForRemoval.id);
        this.dataSource = new MatTableDataSource<Flashcard>(this.flashcards);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  editFlashcard(flashcardToEdit: Flashcard) {
    this.dialog.open(ModifyFlashcardDialogComponent, {
      data: flashcardToEdit,
      disableClose: true,
      panelClass: 'custom-modify-flashcard-dialog-container'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.flashcards = this.flashcards.filter(flashcard => flashcard.id !== flashcardToEdit.id);
        this.flashcards.unshift(flashcardToEdit);
        this.dataSource = new MatTableDataSource<Flashcard>(this.flashcards);
        this.dataSource.paginator = this.paginator;
      }
    })
  }
}
