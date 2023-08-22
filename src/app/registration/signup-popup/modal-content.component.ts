import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AvailableResult, NativeBiometric } from 'capacitor-native-biometric';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal-content',
  templateUrl: 'modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent {
  modalRef!: BsModalRef;
  @Output() onHide = new EventEmitter<void>();

  constructor(
    private router: Router,
    private bsModalRef: BsModalRef,
    private localStorageService: LocalStorageService,
    private storage: Storage
  ) {
    this.storage.create();
    let isBiometric = this.localStorageService.getValue('isBiometric');
    if (isBiometric) {
      this.setCredential('manoj', 'password');
      this.checkCredential();
    }
  }

  navigate() {
    this.doHide();
    this.router.navigateByUrl('/registration/signUp');
  }

  doHide() {
    this.bsModalRef.hide();
  }

  setCredential(username: any, password: any) {
    // Save user's credentials
    NativeBiometric.setCredentials({
      username: username,
      password: password,
      server: 'www.example.com',
    }).then();
  }

  deleteCredential() {
    // Delete user's credentials
    NativeBiometric.deleteCredentials({
      server: 'www.example.com',
    });
  }

  public checkCredential() {
    NativeBiometric.isAvailable().then((result: AvailableResult) => {
      const isAvailable = result.isAvailable;

      if (isAvailable) {
        // Get user's credentials
        NativeBiometric.getCredentials({
          server: 'www.example.com',
        })
          .then((credentials) => {
            // Authenticate using biometrics before logging the user in
            NativeBiometric.verifyIdentity({
              reason: 'For easy log in',
              title: 'Log in',
              subtitle: 'Verify identity',
              description: 'Unlock your device using fingerprint',
            })
              .then(() => {
                // Authentication successful
                console.log('SUCCESS!!');
                this.router.navigate(['/popup']);
                localStorage.setItem('username', 'manoj');
              })
              .catch((err) => {
                // Failed to authenticate
                console.log('FAIL!');
              });
          })
          .catch((err) => {
            // Handle error when getting credentials
            console.log('Error fetching credentials:', err);
          });
      } else {
        // Handle case when biometric is not available on the device
        console.log('Biometric not available on this device.');
      }
    });
  }
}

// @Component({
//   selector: 'app-signup-modal',
//   templateUrl: 'modal-content.component.html',
//   styleUrls: ['./modal-content.component.scss'],
// })
// export class signUpModalComponent {
//   modalRef!: BsModalRef;
//   @Output() onHide = new EventEmitter<void>();

//   constructor(
//     private modalService: BsModalService,
//   ) {

//   }
//   ngOnInit() {
//     // Open the modal when the component loads
//     this.openModal();
//   }

//   openModal() {
//     this.modalRef = this.modalService.show(ModalContentComponent);
//   }
// }
