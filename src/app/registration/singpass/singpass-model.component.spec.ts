import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingpassModelComponent } from './singpass-model.component';

describe('SingpassModelComponent', () => {
  let component: SingpassModelComponent;
  let fixture: ComponentFixture<SingpassModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingpassModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingpassModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
