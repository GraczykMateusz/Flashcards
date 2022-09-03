import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordFormulaComponent } from './reset-password-formula.component';

describe('ResetPasswordFormulaComponent', () => {
  let component: ResetPasswordFormulaComponent;
  let fixture: ComponentFixture<ResetPasswordFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordFormulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
