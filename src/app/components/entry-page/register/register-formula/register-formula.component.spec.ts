import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormulaComponent } from './register-formula.component';

describe('RegisterFormulaComponent', () => {
  let component: RegisterFormulaComponent;
  let fixture: ComponentFixture<RegisterFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFormulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
