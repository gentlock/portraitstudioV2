import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {IEmail,msgStatus} from "../../../../core/abstracts";
import {MailService} from "../../../../core/services/mail/mail.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DbService} from "../../../../core/data/db.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  @ViewChild('contactForm') cntForm!: ElementRef<HTMLFormElement>;
  cntFormModel: FormGroup;
  showMsg = false;
  sentStatus!: number;
  msgStat = msgStatus;
  constructor(
    fb: FormBuilder,
    private mailService: MailService,
    private dbService: DbService,
  ) {
    this.cntFormModel = fb.group({
      name: ['', Validators.required],
      email: ['', {validators: [Validators.required, Validators.email]}],
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
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  };

  ngOnSubmit(event: Event) {
    event.preventDefault();

    if (this.cntFormModel.valid) {
      const data: IEmail = {
        'from_name': this.cntFormModel.get('name')?.value,
        'from_email': this.cntFormModel.get('email')?.value,
        'to_name': this.dbService.conf.transporter.my_name,
        'to_email': this.dbService.conf.transporter.my_email,
        'subject': this.cntFormModel.get('subject')?.value,
        'message': this.cntFormModel.get('message')?.value,
      }

      this.mailService.sendEmail(data).subscribe(
        {
          next: (value) => {
            console.log(value);
            this.showMsg = true;
            this.sentStatus = msgStatus.SUCCESS;
          },
          error: (err: HttpErrorResponse) => {
            this.showMsg = true;
            this.sentStatus = msgStatus.FAILURE;

            console.log(err)
          }
        }
      )
    } else {
      this.validateAllFormFields(this.cntFormModel);
    }
  }
}
