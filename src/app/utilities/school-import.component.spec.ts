import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolImportComponent } from './school-import.component';

describe('SchoolImportComponent', () => {
  let component: SchoolImportComponent;
  let fixture: ComponentFixture<SchoolImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
