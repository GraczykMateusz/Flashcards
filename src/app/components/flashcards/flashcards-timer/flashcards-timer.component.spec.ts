import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsTimerComponent } from './flashcards-timer.component';

describe('FlashcardsTimerComponent', () => {
  let component: FlashcardsTimerComponent;
  let fixture: ComponentFixture<FlashcardsTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsTimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardsTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
