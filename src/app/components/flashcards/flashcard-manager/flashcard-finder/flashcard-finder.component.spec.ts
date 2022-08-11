import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardFinderComponent } from './flashcard-finder.component';

describe('FlashcardFinderComponent', () => {
  let component: FlashcardFinderComponent;
  let fixture: ComponentFixture<FlashcardFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardFinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
