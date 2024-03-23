import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSpammerComponent } from './email-spammer.component';

describe('EmailSpammerComponent', () => {
  let component: EmailSpammerComponent;
  let fixture: ComponentFixture<EmailSpammerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailSpammerComponent]
    });
    fixture = TestBed.createComponent(EmailSpammerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
