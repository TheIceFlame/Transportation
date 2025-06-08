import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarStatusComponent } from './update-car-status.component';

describe('UpdateCarStatusComponent', () => {
  let component: UpdateCarStatusComponent;
  let fixture: ComponentFixture<UpdateCarStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCarStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCarStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
