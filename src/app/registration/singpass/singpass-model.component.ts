import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Renderer2,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { StepperService } from 'src/app/services/stepper.service';
import { environment } from 'src/environments/environment.dev';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singpass-model',
  templateUrl: './singpass-model.component.html',
  styleUrls: ['./singpass-model.component.scss'],
})
export class SingpassModelComponent {
  @Output() closeModalEvent = new EventEmitter();
  constructor(
    public bsModalRef: BsModalRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  // LOADED FRON ENV VARIABLE: public key from MyInfo Consent Platform given to you during onboarding for RSA digital signature
  publicCertContent: any = environment.MYINFO_SIGNATURE_CERT_PUBLIC_CERT;
  // LOADED FRON ENV VARIABLE: your private key for RSA digital signature
  privateKeyContent: any = environment.DEMO_APP_SIGNATURE_CERT_PRIVATE_KEY;
  // LOADED FRON ENV VARIABLE: your client_id provided to you during onboarding
  clientId: any = environment.MYINFO_APP_CLIENT_ID;
  // LOADED FRON ENV VARIABLE: your client_secret provided to you during onboarding
  clientSecret: any = environment.MYINFO_APP_CLIENT_SECRET;
  // redirect URL for your web application
  redirectUrl: any = environment.MYINFO_APP_REDIRECT_URL;

  // URLs for MyInfo APIs
  authLevel: any = environment.AUTH_LEVEL;
  authApiUrl: any = environment.MYINFO_API_AUTHORISE;
  tokenApiUrl: any = environment.MYINFO_API_TOKEN;
  personApiUrl = environment.MYINFO_API_PERSON;

  attributes: any = environment.ATTRIBUTES;
  purpose: any = environment.PURPOSE;
  state: any = environment.STATE;

  ngOnInit(): void {}
  closeModal() {
    this.closeModalEvent.emit();
  }

  redirectToSingpass() {
    var authoriseUrl =
      this.authApiUrl +
      '?client_id=' +
      this.clientId +
      '&attributes=' +
      this.attributes +
      '&purpose=' +
      this.purpose +
      '&state=' +
      encodeURIComponent(this.state) +
      '&redirect_uri=' +
      this.redirectUrl;

    window.location.href = authoriseUrl;
  }
}
