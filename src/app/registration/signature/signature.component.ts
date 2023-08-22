import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { StepperService } from 'src/app/services/stepper.service';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements AfterViewInit {
  @ViewChild('signatureCanvas')
  signatureCanvas!: ElementRef;
  private signaturePad!: SignaturePad;
  imageUrl: any = null;
  signatureImage: any;
  selectedTab:any='draw'
  selectedImage: any;
  constructor(private stepperService : StepperService){}

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.signatureCanvas.nativeElement);
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  saveSignature() {
    const signatureData = this.signaturePad.toDataURL(); // You can use this data to save or display the signature
    // Do something with the signature data, like sending it to a server or storing it locally
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.getBase64(file).then((data: string) => {
      this.imageUrl = data;
    });
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  next()
  {
    this.stepperService.next(17);
  }
  back()
  {
    this.stepperService.next(15);
  }
  changeTab(val) {
    this.selectedTab = val;
  }
}
