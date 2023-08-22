import { Component } from '@angular/core';
import { StepperService } from 'src/app/services/stepper.service';

@Component({
  selector: 'app-qr-upload-document',
  templateUrl: './qr-upload-document.component.html',
  styleUrls: ['./qr-upload-document.component.scss'],
})
export class QrUploadDocumentComponent {
  public stringQrCode: string = null;

  constructor(private stepperService: StepperService) {
    this.stringQrCode = 'www.rtsg.com';
  }

  next() {
    this.stepperService.next(7);
  }
}
