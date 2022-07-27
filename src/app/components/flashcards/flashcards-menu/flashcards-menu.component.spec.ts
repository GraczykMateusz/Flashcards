import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsMenuComponent } from './flashcards-menu.component';

describe('FlashcardsMenuComponent', () => {
  let component: FlashcardsMenuComponent;
  let fixture: ComponentFixture<FlashcardsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
