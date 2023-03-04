import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DbService} from "../../../../core/data/db.service";
import {apiUrls} from "../../../../core/abstracts";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  myFormModel: FormGroup;
  readonly urls;
  constructor(
    private _fb: FormBuilder,
    public dbService: DbService,
  ) {
    this.urls = dbService.conf.api.endpointURLS.authentication;

    this.myFormModel = _fb.group({
      'login': ['', Validators.required],
      'pass': ['', Validators.required],
    });
  }

  ngOnSubmit = (e: Event) => {

  }
}
