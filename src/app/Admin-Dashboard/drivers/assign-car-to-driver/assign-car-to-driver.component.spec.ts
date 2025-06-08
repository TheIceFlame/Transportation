import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCarToDriverComponent } from './assign-car-to-driver.component';

describe('AssignCarToDriverComponent', () => {
  let component: AssignCarToDriverComponent;
  let fixture: ComponentFixture<AssignCarToDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignCarToDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignCarToDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
