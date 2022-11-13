import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsEditorComponent } from './flashcards-editor.component';

describe('FlashcardsEditorComponent', () => {
  let component: FlashcardsEditorComponent;
  let fixture: ComponentFixture<FlashcardsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
