import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {map, take} from 'rxjs';
import {FlashcardsService} from '../../../../services/flashcards/flashcards.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {Flashcard} from '../../../../services/flashcards/model/flashcard';

@Component({
  selector: 'app-flashcard-editor',
  templateUrl: './flashcard-editor.component.html',
  styleUrls: ['./flashcard-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlashcardEditorComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading = true;
  dataSource = new MatTableDataSource<Flashcard>();

  displayedColumns: string[] = ['content', 'translation', 'image-and-example', 'action'];

  constructor(private flashcardsService: FlashcardsService,
              private auth: AuthService) {
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
              this.dataSource = new MatTableDataSource<Flashcard>(flashcards);
              this.dataSource.paginator = this.paginator;
              this.loading = false;
            });
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

  deleteFlashcard() {

  }
}
