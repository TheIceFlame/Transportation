import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestCardComponent } from './add-request-card.component';

describe('AddRequestCardComponent', () => {
  let component: AddRequestCardComponent;
  let fixture: ComponentFixture<AddRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRequestCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
