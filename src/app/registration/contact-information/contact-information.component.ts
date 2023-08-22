import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import { ContactInfoModel } from './contactInfo.model';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss']
})
export class ContactInformationComponent {
  @ViewChild('mAddress')
  mAddress:HTMLInputElement; // Could also use interface Element


  contactInfoForm: FormGroup;
  contactInfoModel: ContactInfoModel;
  constructor(private stepperService: StepperService, private fb: FormBuilder,) { }
  ngOnInit(): void {

    this.contactInfoModel = new ContactInfoModel('', '', '', '', '', '', '', '', ''); // Initialize the user model with default values
    this.contactInfoForm = this.fb.group({
      address: [this.contactInfoModel.address, Validators.required],
      state: [this.contactInfoModel.state, Validators.required],
      city: [this.contactInfoModel.city, Validators.required],
      postal_zipcode: [this.contactInfoModel.postal_zipcode, Validators.required],
      mailSameAsPermanent: [this.contactInfoModel.mailSameAsPermanent],
      mailAddress: [this.contactInfoModel.mailAddress, Validators.required],
      mailState: [this.contactInfoModel.mailState, Validators.required],
      mailCity: [this.contactInfoModel.mailCity, Validators.required],
      mailPostal_zipcode: [this.contactInfoModel.mailPostal_zipcode, [Validators.required]],
    });
  }
  next() {
    this.stepperService.next(10);
  }
  selectOption(event: any) {    
     if(event.target.checked) {
      console.log('true called');
      
      this.contactInfoForm.controls['mailAddress'].setValue(this.contactInfoForm.get('address')?.value);
      this.contactInfoForm.controls['mailState'].setValue(this.contactInfoForm.get('state')?.value)
      this.contactInfoForm.controls['mailCity'].setValue(this.contactInfoForm.get('city')?.value)
      this.contactInfoForm.controls['mailPostal_zipcode'].setValue(this.contactInfoForm.get('postal_zipcode')?.value)
      this.contactInfoForm.controls["mailAddress"].updateValueAndValidity();
      this.contactInfoForm.controls["mailState"].updateValueAndValidity();
      this.contactInfoForm.controls["mailCity"].updateValueAndValidity();
      this.contactInfoForm.controls["mailPostal_zipcode"].updateValueAndValidity();

      console.log(this.contactInfoForm.value);
      
  
      this.contactInfoForm.controls['mailAddress'].disable();
      this.contactInfoForm.controls['mailState'].disable();
      this.contactInfoForm.controls['mailCity'].disable();
      this.contactInfoForm.controls['mailPostal_zipcode'].disable();
  }else{
      this.contactInfoForm.controls['mailAddress'].setValue('');
      this.contactInfoForm.controls['mailState'].setValue('')
      this.contactInfoForm.controls['mailCity'].setValue('')
      this.contactInfoForm.controls['mailPostal_zipcode'].setValue('')
      this.contactInfoForm.controls["mailAddress"].updateValueAndValidity();
      this.contactInfoForm.controls["mailState"].updateValueAndValidity();
      this.contactInfoForm.controls["mailCity"].updateValueAndValidity();
      this.contactInfoForm.controls["mailPostal_zipcode"].updateValueAndValidity();
            
      this.contactInfoForm.controls['mailAddress'].reset({ value: '', disabled: false });
      this.contactInfoForm.controls['mailState'].reset({ value: '', disabled: false });
      this.contactInfoForm.controls['mailCity'].reset({ value: '', disabled: false });
      this.contactInfoForm.controls['mailPostal_zipcode'].reset({ value: '', disabled: false });
      this.contactInfoForm.controls["mailAddress"].updateValueAndValidity();
      this.contactInfoForm.controls["mailState"].updateValueAndValidity();
      this.contactInfoForm.controls["mailCity"].updateValueAndValidity();
      this.contactInfoForm.controls["mailPostal_zipcode"].updateValueAndValidity();
  }
}
editVAlues(event){
//   console.log((this.contactInfoForm.controls["mailSameAsPermanent"]?.value));
  
//   if(this.contactInfoForm.controls["mailSameAsPermanent"]?.value){
//   let data=this.contactInfoForm.controls["mailSameAsPermanent"].setValue(false);
//   this.contactInfoForm.controls["mailSameAsPermanent"].updateValueAndValidity();
//  // this.selectOption(data);
//   }
}
  onSubmit() {
    console.log("submit call");
    if(!this.contactInfoForm.controls["mailSameAsPermanent"]?.value){
      this.contactInfoForm.controls["mailSameAsPermanent"].setValue(false);
       this.contactInfoForm.controls["mailSameAsPermanent"].updateValueAndValidity();
       }
    console.log(this.contactInfoForm.value);
    
   console.log(this.contactInfoForm.valid)
  
    if (this.contactInfoForm.valid) {
      console.log(this.contactInfoForm.value);
      this.contactInfoModel = this.contactInfoForm.value;

      this.next();
    } else {
      this.markFormGroupAsTouched(this.contactInfoForm);
    }
  }
  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupAsTouched(control);
      }
    });
  }
}
