import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  @ViewChild('contactForm') cntForm!: ElementRef<HTMLFormElement>;
  cntFormModel: FormGroup;

  constructor(fb: FormBuilder) {
    this.cntFormModel = fb.group({
      name: ['', Validators.required],
      email: ['', { validators: [Validators.required, Validators.email] }],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  isFieldValid = (field: string) => {
    return (
      this.cntFormModel.get(field)?.invalid &&
      (this.cntFormModel.get(field)?.dirty ||
        this.cntFormModel.get(field)?.touched)
    );
  };

  validateAllFormFields = (formGroup: FormGroup) => {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  };

  ngOnSubmit(event: Event) {
    event.preventDefault();

    if (this.cntFormModel.valid) {
      console.log('wysylam');
      this.cntForm.nativeElement.submit();
    } else {
      this.validateAllFormFields(this.cntFormModel);
      console.log('bledy');
    }
  }
}
