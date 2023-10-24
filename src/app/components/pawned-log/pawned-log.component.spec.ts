import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PawnedLogComponent } from './pawned-log.component';

describe('PawnedLogComponent', () => {
  let component: PawnedLogComponent;
  let fixture: ComponentFixture<PawnedLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PawnedLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PawnedLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
