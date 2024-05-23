import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClassificationDialogComponent } from './edit-classification-dialog.component';

describe('EditClassificationDialogComponent', () => {
  let component: EditClassificationDialogComponent;
  let fixture: ComponentFixture<EditClassificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditClassificationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditClassificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
