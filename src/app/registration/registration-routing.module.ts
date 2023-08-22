import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { SignupPopupComponent } from './signup-popup/signup-popup.component';
import { QrUploadDocumentComponent } from './qr-upload-document/qr-upload-document.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';

const routes: Routes = [
  { path: '', component: SignupPopupComponent },
  { path: 'signUp', component: RegistrationComponent },
  { path: 'qr', component: QrUploadDocumentComponent },
  { path: 'otp', component: OtpVerificationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
