import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrUploadDocumentComponent } from './qr-upload-document.component';

describe('QrUploadDocumentComponent', () => {
  let component: QrUploadDocumentComponent;
  let fixture: ComponentFixture<QrUploadDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrUploadDocumentComponent]
    });
    fixture = TestBed.createComponent(QrUploadDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
