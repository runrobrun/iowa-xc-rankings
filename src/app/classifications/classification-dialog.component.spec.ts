import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationDialogComponent } from './classification-dialog.component';

describe('EditClassificationDialogComponent', () => {
  let component: ClassificationDialogComponent;
  let fixture: ComponentFixture<ClassificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
