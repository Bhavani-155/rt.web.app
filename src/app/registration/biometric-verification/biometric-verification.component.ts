import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StepperService } from 'src/app/services/stepper.service';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { CameraOptions, CameraResultType } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
import { BiometricModel } from './biometric-verification.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const { Camera } = Plugins;
@Component({
  selector: 'app-biometric-verification',
  templateUrl: './biometric-verification.component.html',
  styleUrls: ['./biometric-verification.component.scss'],
})
export class BiometricVerificationComponent implements OnInit {
  isCameraOpen: boolean = false;
  isPictureCaptured: boolean = false;
  documentUpload: boolean = true;
  documentText: any = 'Passport';

  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  preview: boolean = false;
  passportView: boolean = false;
  NRIC: boolean = false;

  selfi: boolean = false;
  capture: boolean = true;
  retake: boolean = false;
  biometricModel: BiometricModel;
  biometricForm: FormGroup;
  constructor(private stepperService: StepperService,private fb : FormBuilder) { }

  docFront: any = 'File Name';
  docBack: any = 'File Name';
  src: string = '';
  RegistrationContinue: boolean = false;
  arrayData: any = [];
  imgURL: any;
  options = [
    { id: 1, name: 'Passport' },
    { id: 2, name: 'NRIC' },
  ];

  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  
  ngOninit()
  {
    this.biometricModel = new BiometricModel('','','');
    this.biometricForm = this.fb.group(
      {
        docFront : ['',Validators.required],
        docBack : ['',Validators.required],
        selfie : ['',Validators.required]
      }
    )
  }
  back() {
    this.stepperService.next(1);
  }
  next() {
    this.stepperService.next(8);
  }

  onFileSelected(event: any, type: any) {
    if (type == 'docFront') {
      this.biometricForm.controls['docFront'] = event.target.files[0].name;
    } else if (type == 'docBack') {
      this.biometricForm.controls['docBack'] = event.target.files[0].name;
    }
  }
  startCamera() {
    this.isCameraOpen = true;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video: HTMLVideoElement = this.videoElement.nativeElement;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => console.error('Error accessing camera:', err));
  }

  captureAndSave() {
    this.isPictureCaptured = true;
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    const { videoWidth, videoHeight } = video;

    canvas.width = videoWidth;
    canvas.height = videoHeight;
    context.drawImage(video, 0, 0, videoWidth, videoHeight);

    const imageBlob = this.dataURItoBlob(canvas.toDataURL('image/png'));

    // Save the image file (you can modify this part to suit your needs)
    const link = document.createElement('a');
    link.href = URL.createObjectURL(imageBlob);
    link.download = 'captured_image.png';
    link.click();
  }
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }
  onChange(value: any) {
    if (value.target.value == '1') {
      this.passportView = false;
      this.documentText = 'Passport';
    } else {
      this.NRIC = true;
      this.preview = true;
      this.documentText = 'NRIC';
    }
  }
  getCamera() {
    let options: CameraOptions = {
      quality: 100,
      resultType: CameraResultType.DataUrl,
      saveToGallery: true,
      height: 500, // Set desired height here
      width: 600, // Set desired width here
      allowEditing: true,
    };
    Camera['getPhoto'](options).then(
      (result: any) => {
        if (result.dataUrl) {
          this.src = result.dataUrl;
          this.arrayData.push(result.dataUrl);
          this.RegistrationContinue = true;
          if (this.arrayData.length == 1) {
            this.capture = false;
            this.retake = true;
          } else if (this.arrayData.length == 2) {
            this.capture = false;
            this.retake = true;
          } else if (this.arrayData.length == 3) {
            this.capture = false;
            this.retake = true;
          }
        }
      },
      (err: any) => {}
    );
  }
  retakeImg() {
    if (this.arrayData.length == 1) {
      this.arrayData = [];
    } else if (this.arrayData.length == 2 || this.arrayData.length == 3) {
      this.arrayData.pop();
    }
    this.getCamera();
  }
  nextImg() {
    this.RegistrationContinue = false;
    this.src = '';
    this.passportView = true;
    this.retake = false;
    this.capture = true;

    if (this.arrayData.length == 2) {
      this.selfi = true;
    }
    if (this.arrayData.length == 3) {
      this.documentUpload = false;
      this.previewImage();
    }
  }
  previewImage() {
    this.RegistrationContinue = false;
  }
}
