import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountReviewComponent } from './customer-account-review.component';

describe('CustomerAccountReviewComponent', () => {
  let component: CustomerAccountReviewComponent;
  let fixture: ComponentFixture<CustomerAccountReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAccountReviewComponent]
    });
    fixture = TestBed.createComponent(CustomerAccountReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
