import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFormsComponent } from './email-forms.component';

describe('EmailFormsComponent', () => {
  let component: EmailFormsComponent;
  let fixture: ComponentFixture<EmailFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailFormsComponent]
    });
    fixture = TestBed.createComponent(EmailFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
