import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsImageComponent } from './flashcards-image.component';

describe('FlashcardsImageComponent', () => {
  let component: FlashcardsImageComponent;
  let fixture: ComponentFixture<FlashcardsImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
