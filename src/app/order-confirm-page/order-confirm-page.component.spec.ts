import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmPageComponent } from './order-confirm-page.component';

describe('OrderConfirmPageComponent', () => {
  let component: OrderConfirmPageComponent;
  let fixture: ComponentFixture<OrderConfirmPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderConfirmPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
