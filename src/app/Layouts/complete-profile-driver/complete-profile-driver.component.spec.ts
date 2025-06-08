import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteProfileDriverComponent } from './complete-profile-driver.component';

describe('CompleteProfileDriverComponent', () => {
  let component: CompleteProfileDriverComponent;
  let fixture: ComponentFixture<CompleteProfileDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteProfileDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteProfileDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
