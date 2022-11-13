import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFlashcardDialogComponent } from './remove-flashcard-dialog.component';

describe('RemoveFlashcardDialogComponent', () => {
  let component: RemoveFlashcardDialogComponent;
  let fixture: ComponentFixture<RemoveFlashcardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveFlashcardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveFlashcardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
