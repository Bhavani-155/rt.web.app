import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingpassComponent } from './singpass.component';

describe('SingpassComponent', () => {
  let component: SingpassComponent;
  let fixture: ComponentFixture<SingpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingpassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
