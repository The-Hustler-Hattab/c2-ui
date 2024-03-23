import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSmtpTableComponent } from './email-smtp-table.component';

describe('EmailSmtpTableComponent', () => {
  let component: EmailSmtpTableComponent;
  let fixture: ComponentFixture<EmailSmtpTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailSmtpTableComponent]
    });
    fixture = TestBed.createComponent(EmailSmtpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
