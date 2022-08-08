import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardRemoverComponent } from './flashcard-remover.component';

describe('FlashcardRemoverComponent', () => {
  let component: FlashcardRemoverComponent;
  let fixture: ComponentFixture<FlashcardRemoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardRemoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardRemoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
