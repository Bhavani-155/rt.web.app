import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManualDocumentUploadComponent } from './Biometric-verification.component';


describe('ManualDocumentUploadComponent', () => {
  let component: ManualDocumentUploadComponent;
  let fixture: ComponentFixture<ManualDocumentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualDocumentUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualDocumentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
