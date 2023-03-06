import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DbService} from "../../../../core/data/db.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IEmail} from "../../../../core/abstracts";
import {HttpErrorResponse} from "@angular/common/http";
import {MailService} from "../../../../core/services/mail/mail.service";

@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.scss']
})
export class SendemailComponent implements AfterViewInit{
  myFormModel: FormGroup;
  finalMsg: any;
  constructor(
    private _fb: FormBuilder,
    public dbService: DbService,
    public mailService: MailService,
    @Inject(MAT_DIALOG_DATA) public data: {content: IEmail},
    public dialogRef: MatDialogRef<SendemailComponent>,
  ) {
    this.myFormModel = _fb.group({
      'to_name': ['', Validators.required],
      'to_email': ['', Validators.email],
      'subject': ['', Validators.required],
      'message': ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.myFormModel.get('to_name')?.setValue(this.data.content.to_name);
    this.myFormModel.get('to_email')?.setValue(this.data.content.to_email);
    this.myFormModel.get('subject')?.setValue(this.data.content.subject);
    this.myFormModel.get('message')?.setValue(this.data.content.message);
  }

  onSend(e: Event) {
    if(prompt("wpisz słowo: tak") === 'tak') {
      if (this.myFormModel.valid) {
        const data: IEmail = {
          'to_name': this.myFormModel.get('to_name')?.value,
          'to_email': this.myFormModel.get('to_email')?.value,
          'from_name': this.dbService.conf.transporter.my_name,
          'from_email': this.dbService.conf.transporter.my_email,
          'subject': this.myFormModel.get('subject')?.value,
          'message': this.myFormModel.get('message')?.value,
        }

        this.mailService.sendEmail(data).subscribe(
          {
            next: (value) => {
              this.finalMsg = value;
              // console.log(value);
            },
            error: (err: HttpErrorResponse) => {
              this.finalMsg = err;
              // console.log(err)
            }
          }
        )
      }
    }
  }

  closeDialog(e: Event) {
    this.dialogRef.close( JSON.stringify(this.finalMsg) );
  }
  // onCancel(): void {
  //   this.dialogRef.close();
  // }
}
