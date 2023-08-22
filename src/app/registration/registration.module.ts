import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { DocumentHomeComponent } from './document-home/document-home.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { BiometricVerificationComponent } from './biometric-verification/biometric-verification.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { InvestmentKnowledgeComponent } from './investment-knowledge/investment-knowledge.component';
import { RegularityInfoComponent } from './regularity-info/regularity-info.component';
import { SignatureComponent } from './signature/signature.component';
import { SharedModule } from '../shared/shared-component/shared.module';
import { WebcamModule } from 'ngx-webcam';
import { Camera } from '@capacitor/camera';
import { CameraPlugin } from '@capacitor/camera';

import { CameraOptions, CameraResultType } from '@capacitor/camera';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { PasswordComponent } from './password/password.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { BankDetailsComponent } from './bank-detail/bank-details.component';
import { CustomerAccountReviewComponent } from './customer-account-review/customer-account-review.component';
import { BrowserModule } from '@angular/platform-browser';
import { QrUploadDocumentComponent } from './qr-upload-document/qr-upload-document.component';
import { FinancialInformationComponent } from './financial-information/financial-information.component';
// import { ModalContentComponent } from './signup-popup/modal-content.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  declarations: [
    MenuComponent,
    RegistrationComponent,
    SignupComponent,
    OtpVerificationComponent,
    DocumentHomeComponent,
    BiometricVerificationComponent,
    PersonalInformationComponent,
    ContactInformationComponent,
    InvestmentKnowledgeComponent,
    RegularityInfoComponent,
    SignatureComponent,
    PasswordComponent,
    DeclarationComponent,
    BankDetailsComponent,
    CustomerAccountReviewComponent,
    QrUploadDocumentComponent,
    FinancialInformationComponent,
  ],
  exports: [
    RegistrationRoutingModule,
    RegistrationComponent,
    SignupComponent,
    FormsModule,
    BrowserModule,
    FinancialInformationComponent,
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    WebcamModule,
    BrowserModule,
    QRCodeModule,
    IonicModule.forRoot(),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
})
export class RegistrationModule {}
