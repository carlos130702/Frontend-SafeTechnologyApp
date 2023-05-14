import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImageTechnicianComponent } from './edit-image-technician.component';

describe('EditImageTechnicianComponent', () => {
  let component: EditImageTechnicianComponent;
  let fixture: ComponentFixture<EditImageTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditImageTechnicianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImageTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
