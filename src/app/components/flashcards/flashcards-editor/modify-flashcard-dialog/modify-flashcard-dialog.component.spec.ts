import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyFlashcardDialogComponent } from './modify-flashcard-dialog.component';

describe('ModifyFlashcardDialogComponent', () => {
  let component: ModifyFlashcardDialogComponent;
  let fixture: ComponentFixture<ModifyFlashcardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyFlashcardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyFlashcardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
