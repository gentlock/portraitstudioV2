import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { myPasswordGenerator, clearFormField} from "../../../../core/libs";
import { DbService } from "../../../../core/data/db.service";
import {Observable, Subject} from "rxjs";
import {IPortfolioFeed, IMyserviceFeed, apiUrls, IEmail} from "../../../../core/abstracts";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SendemailComponent} from "../../components/sendemail/sendemail.component";

import {DOCUMENT} from "@angular/common";
import { errHandler } from "../../../../core/services/err/errHandler";

@Component({
  selector: 'app-portfolio-mgr',
  templateUrl: './portfolio-mgr.component.html',
  styleUrls: ['./portfolio-mgr.component.scss'],
})
export class PortfolioMgrComponent implements AfterViewInit {
  myFormModel: FormGroup;
  myFormFile: FormGroup;
  clearField = clearFormField;
  servicesList$!: Observable<IMyserviceFeed[]>;
  eventsSubject: Subject<string> = new Subject<string>();
  progressValue = 0;
  DBschema = 'portfolioSchema';
  filename!: string;
  filesize!: number;
  readonly urls: apiUrls;
  errBox = errHandler();

  constructor(
    private _fb: FormBuilder,
    public dbService: DbService,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.urls = dbService.conf.api.endpointURLS.portfolio;

    this.myFormModel = _fb.group({
      'id':[''],
      'isActive':[''],
      'name': ['', Validators.required],
      'clientName': ['', Validators.required],
      'clientEmail': ['', Validators.email],
      'accessCode': ['', Validators.required],
      'desc': ['', Validators.required],
      'serviceId': ['', Validators.required],
      'clientInfo'  : ['']
    });

    this.myFormFile = _fb.group({
      'plik':[''],
    })
  }

  ngAfterViewInit() {
    this.servicesList$ = this.dbService.getAll( this.dbService.conf.api.endpointURLS.myservices.basePath + this.dbService.conf.api.endpointURLS.myservices.getAll ) ;
  }
  sendEmailDialog(event: Event) {
    event.preventDefault();

    let content: IEmail = {
      'to_name'   : this.myFormModel.get('clientName')?.value,
      'to_email'  : this.myFormModel.get('clientEmail')?.value,
      'from_name' : this.dbService.conf.transporter.my_name,
      'from_email': this.dbService.conf.transporter.my_email,
      'subject'   : "link do galerii",
      'message'   : `${document.location.origin}/#/privGallery/${this.myFormModel.get('id')?.value}`,
    }

    const dialogRef = this.dialog.open(SendemailComponent,
      {
        data: {content: content},
        minHeight: document.body.clientHeight / 2,
        minWidth: document.body.clientWidth / 2,
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  ngOnSubmit = (e: Event) => {
    e.preventDefault();
    let id = this.myFormModel.get('id')?.value;

    const data: IPortfolioFeed = {
      'isActive'      : this.myFormModel.get('isActive')?.value || false,
      'name'          : this.myFormModel.get('name')?.value,
      'clientName'    : this.myFormModel.get('clientName')?.value,
      'clientEmail'   : this.myFormModel.get('clientEmail')?.value,
      'accessCode'    : this.myFormModel.get('accessCode')?.value,
      'desc'          : this.myFormModel.get('desc')?.value,
      'serviceId'     : this.myFormModel.get('serviceId')?.value,
      'clientInfo'    : this.myFormModel.get('clientInfo')?.value,
    }

    if(this.myFormModel.valid) {
      if(!!id) {
        this.dbService.recordUpdate(id, this.urls.basePath + this.urls.update, data).subscribe(
          {
            next: (value)=>{
              this.populate(value._id!);
              this.refreshSignal(value._id!);
            },
            error: (err: HttpErrorResponse)=>{
              this.errBox(err);
              console.log(err)
            }
          }
        );
      } else {
        this.dbService.recordAddNew(this.urls.basePath + this.urls.addNew, data).subscribe(
          {
            next: (value) => {
              this.populate(value._id!);
              this.refreshSignal(value._id!);
            },
            error: (err: HttpErrorResponse) => {
              this.errBox(err);
              console.log(err)
            }
          });
      }
    }
  }

  db_delete = ( id: string ) => {
    this.dbService.recordDel(id, this.urls.basePath + this.urls.remove).subscribe(
      {
        next: (value)=>{
          this.errBox(value);
          this.refreshSignal('');
        },
        error: (err: HttpErrorResponse)=>{
          this.errBox(err);
          console.log(err)
        }
      })
  }

  populate = ( id: string ) => {
    this.myFormFile.reset();
    this.progressValue = 0;

    this.dbService.getById( id, this.urls.basePath + this.urls.getById ).subscribe(
      {
        next: (data) => {
          this.myFormModel.get('id')?.setValue(id);
          this.myFormModel.get('isActive')?.setValue(<boolean>data.isActive);
          this.myFormModel.get('name')?.setValue(data.name);
          this.myFormModel.get('clientName')?.setValue(data.clientName);
          this.myFormModel.get('clientEmail')?.setValue(data.clientEmail);
          this.myFormModel.get('accessCode')?.setValue(data.accessCode);
          this.myFormModel.get('desc')?.setValue(data.desc);
          this.myFormModel.get('serviceId')?.setValue(data.serviceId);
          this.myFormModel.get('clientInfo')?.setValue(data.clientInfo);

          this.filename = data.downloadable?.filename!;
          this.filesize = parseInt(data.downloadable?.filesize.toString()!);
        },
        error: (err: HttpErrorResponse) => {
          this.errBox(err);
          console.log(err)
        }
      }
    )
  }

  handleUpload(event: Event) {
    event.preventDefault();

    let formData    = new FormData();
    let element     = event.currentTarget as HTMLInputElement;
    let fileslist   = element.files;
    let id = this.myFormModel.get('id')?.value;

    if( !!fileslist && !!id ) {
      if(confirm('napewno przegrac plik?')) {
        let upURL = this.dbService.conf.api.endpointURLS.dataMgr.basePath + this.dbService.conf.api.endpointURLS.dataMgr.uploadSingle;
        formData.append('file', fileslist[0]);

        this.filename = fileslist[0].name;
        this.filesize = parseInt(fileslist[0].size.toString());

        this.dbService.uploadSingle(id, upURL, formData).subscribe(
          {
            next: (event) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progressValue = Math.round(event.loaded / event.total! * 100);
              } else if (event.type === HttpEventType.Response) {}
            },
            error: (err) => {
              this.errBox(err);
              console.log(err)
            }
          })
      }
    }
  }

  resetForm(e: Event) {
    this.myFormModel.get('id')?.setValue(null);
    this.myFormModel.reset();
  }

  refreshSignal(id: string) {
    this.eventsSubject.next(id);
  }

  generatePassword(event: Event) {
    event.preventDefault();
    this.myFormModel.get('accessCode')?.setValue( myPasswordGenerator.generate(8) );
  }
}
