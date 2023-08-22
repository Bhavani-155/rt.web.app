import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentKnowledgeComponent } from './investment-knowledge.component';

describe('InvestmentKnowledgeComponent', () => {
  let component: InvestmentKnowledgeComponent;
  let fixture: ComponentFixture<InvestmentKnowledgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentKnowledgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
