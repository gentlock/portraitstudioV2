import { Component } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {apiUrls, IMyserviceFeed} from "../../../../core/abstracts";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {clearFormField} from "../../../../core/libs";
import {DbService} from "../../../../core/data/db.service";

@Component({
  selector: 'app-myservices-mgr',
  templateUrl: './myservices-mgr.component.html',
  styleUrls: ['./myservices-mgr.component.scss'],
})
export class MyservicesMgrComponent {
  myFormModel: FormGroup;
  clearField = clearFormField;
  eventsSubject: Subject<string> = new Subject<string>();
  DBschema = 'myservicesSchema';
  readonly urls: apiUrls;

  constructor(
    private _fb: FormBuilder,
    public dbService: DbService

  ) {
    this.urls = dbService.conf.api.endpointURLS.myservices;

    this.myFormModel = _fb.group({
      'id':[''],
      'action':['action'],
      'isActive':[''],
      'name': ['', Validators.required],
      'subtitle': ['', Validators.required],
      'desc': ['', Validators.required],
      'priceList': ['', Validators.required],
    });
  }
  refreshSignal(id: string) {
    this.eventsSubject.next(id);
  }

  db_delete = ( id: string ) => {
    this.dbService.recordDel( id, this.urls.basePath + this.urls.remove ).subscribe(
      {
        next: (value)=>{
          this.refreshSignal('');
          // console.log(value)
        },
        error: (err: HttpErrorResponse)=>{ console.log(err)}
      })
  }

  populate = ( id: string ) => {
    this.dbService.getById( id, this.urls.basePath + this.urls.getById  ).subscribe(
      {
        next: (data) => {
          this.myFormModel.get('id')?.setValue(id);
          this.myFormModel.get('isActive')?.setValue(<boolean>data.isActive);
          this.myFormModel.get('name')?.setValue(data.name);
          this.myFormModel.get('desc')?.setValue(data.desc);
          this.myFormModel.get('subtitle')?.setValue(data.subtitle);
          this.myFormModel.get('priceList')?.setValue(data.priceList);
        },
        error: (err: HttpErrorResponse) => { console.log(err) }
      }
    )
  }

  resetForm(e: Event) {
    this.myFormModel.get('id')?.setValue(null);
    this.myFormModel.reset();
  }

  ngOnSubmit = (e: Event) => {
    e.preventDefault();
    let id = this.myFormModel.get('id')?.value;

    const data: IMyserviceFeed = {
      'isActive'    : this.myFormModel.get('isActive')?.value || false,
      'name'        : this.myFormModel.get('name')?.value,
      'subtitle'    : this.myFormModel.get('subtitle')?.value,
      'desc'        : this.myFormModel.get('desc')?.value,
      'priceList'   : this.myFormModel.get('priceList')?.value
    }

    if(this.myFormModel.valid) {
      if(!!id) {
        // console.log('uaktualniam');
        this.dbService.recordUpdate(id, this.urls.basePath + this.urls.update, data).subscribe(
          {
            next: (value)=>{
              this.populate(value._id!);
              this.refreshSignal(value._id!);
            },
            error: (err: HttpErrorResponse)=>{ console.log(err)}
          }
        );
      } else  {
        // console.log('dodaje nowy');
        this.dbService.recordAddNew(this.urls.basePath + this.urls.addNew, data).subscribe(
          {
            next: (value)=>{
              this.populate(value._id!);
              this.refreshSignal(value._id!);
            },
            error: (err: HttpErrorResponse)=>{ console.log(err)}
          }
        );
      }
    }
  }
}
