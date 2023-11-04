import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S3FilesComponent } from './s3-files.component';

describe('S3FilesComponent', () => {
  let component: S3FilesComponent;
  let fixture: ComponentFixture<S3FilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S3FilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S3FilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
