import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassFilesComponent } from './pass-files.component';

describe('PassFilesComponent', () => {
  let component: PassFilesComponent;
  let fixture: ComponentFixture<PassFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassFilesComponent]
    });
    fixture = TestBed.createComponent(PassFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
