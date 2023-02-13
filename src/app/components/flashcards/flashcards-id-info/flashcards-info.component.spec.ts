import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsInfoComponent } from './flashcards-info.component';

describe('FlashcardsInfoComponent', () => {
  let component: FlashcardsInfoComponent;
  let fixture: ComponentFixture<FlashcardsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
