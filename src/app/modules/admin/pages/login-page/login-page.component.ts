import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DbService} from "../../../../core/data/db.service";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {IAuth, IMyserviceFeed} from "../../../../core/abstracts";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  myFormModel: FormGroup;
  logiInFailure = false;

  constructor(
    private _fb: FormBuilder,
    public auth: AuthService,
    private router: Router
  ) {
    this.myFormModel = _fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  ngOnSubmit = (e: Event) => {
    e.preventDefault();

    if(this.myFormModel.valid) {
      const data: IAuth = {
        'email'     : this.myFormModel.get('email')?.value,
        'password'  : this.myFormModel.get('password')?.value,
      }

      this.auth.verifyCred(data).subscribe(
        {
          next: (data) => {
            if(data.token) {
              this.logiInFailure = false;
              this.auth.attachToken(data.token);
              this.router.navigate(['admin']);
            } else {
              this.logiInFailure = true;
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        })
    }
  }
}
