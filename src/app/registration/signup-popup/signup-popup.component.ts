import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from './modal-content.component';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrls: ['./signup-popup.component.scss'],
})
export class SignupPopupComponent implements OnInit {
  modalRef!: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit() {
    this.openModal();
  }

  openModal() {
    this.modalRef = this.modalService.show(ModalContentComponent);
  }
  
}
