import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsCarrierTableComponent } from './sms-carrier-table.component';

describe('SmsCarrierTableComponent', () => {
  let component: SmsCarrierTableComponent;
  let fixture: ComponentFixture<SmsCarrierTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmsCarrierTableComponent]
    });
    fixture = TestBed.createComponent(SmsCarrierTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
