import { Injectable } from '@angular/core';
import { FlashcardsService } from '../flashcards/flashcards.service';
import { Observable, Subject, take } from 'rxjs';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { SnackBarComponent } from '../../components/common/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackupFlashcard } from './backup-flashcard';
import { FLASHCARDS } from '../firebase-utils/collection-names';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  private refreshTable = new Subject<boolean>();

  constructor(private flashcardsService: FlashcardsService,
              private snackBar: MatSnackBar) {
  }

  import(): void {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: any): void => {
      const file = e?.target?.files[0];
      if (file.type === 'application/x-zip-compressed' && file.name.includes('-backup.zip')) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = this.onFileLoad;
      } else {
        this.openSnackBar(false);
      }
    };
    input.click();
  }

  private onFileLoad = (readerEvent: any): void => {
    const content = readerEvent?.target?.result;
    const jszip = new JSZip();
    this.flashcardsService.deleteUserFlashcards().then(() => {
      jszip.loadAsync(content as any).then(zip => {
        zip.files[FLASHCARDS + '.json'].async('string').then(async fileData => {
          const backupFlashcards: BackupFlashcard[] = JSON.parse(fileData) as BackupFlashcard[];
          this.flashcardsService.addFlashcardsFromBackup(backupFlashcards)
            .then(() => {
              this.refreshTable.next(true);
              return this.openSnackBar(true)
            });
        });
      });
    });
  };

  download() {
    const jszip = new JSZip();
    this.flashcardsService.getFlashcards()
      .pipe(take(1))
      .subscribe(r => {
        jszip.file(FLASHCARDS + '.json', JSON.stringify(r));
        jszip.generateAsync({type: 'blob'}).then(function (content) {
          const date = new Date().toLocaleString()
            .replaceAll(', ', '-')
            .replaceAll(':', '_')
            .replaceAll('/', '_');
          saveAs(content, date + '-backup.zip');
        }).then(() => this.openSnackBar(true));
      });
  }

  openSnackBar(success: boolean): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: success
    });
  }

  observeTrigger(): Observable<boolean> {
    return this.refreshTable.asObservable();
  }
}
