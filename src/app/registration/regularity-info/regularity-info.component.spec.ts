import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularityInfoComponent } from './regularity-info.component';

describe('RegularityInfoComponent', () => {
  let component: RegularityInfoComponent;
  let fixture: ComponentFixture<RegularityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularityInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegularityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
