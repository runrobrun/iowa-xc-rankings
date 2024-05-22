import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationsListComponent } from './classifications-list.component';

describe('ClassificationsListComponent', () => {
  let component: ClassificationsListComponent;
  let fixture: ComponentFixture<ClassificationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificationsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassificationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
