import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTablesComponent } from './email-tables.component';

describe('EmailTablesComponent', () => {
  let component: EmailTablesComponent;
  let fixture: ComponentFixture<EmailTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailTablesComponent]
    });
    fixture = TestBed.createComponent(EmailTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
