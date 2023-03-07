import {HttpClient, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {Component, ElementRef, Input, OnChanges, Renderer2, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {IMyserviceFeed, IPortfolioFeed} from "../../../../core/abstracts";
import {DbService} from "../../../../core/data/db.service";
import { errHandler } from "../../../../core/services/err/errHandler";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnChanges{
  @ViewChild('dropBox') dropBox!: ElementRef<HTMLDivElement>;
  progressValue = 0;
  // id = new FormControl('');
  @Input() uniqID!: string;
  @Input() useCollection: any;
  @Input() useSchema!: string;
  data$!: Observable<IPortfolioFeed|IMyserviceFeed>;
  baseURL: string;
  upDataURL: string;
  delFileURL: string;
  fetchGalleryURL: string;
  setCoverPhotoURL: string;
  uploadSingleURL: string;
  errBox = errHandler();

  constructor(
    private _render: Renderer2,
    private http: HttpClient,
    private dbService: DbService
  ) {
    this.baseURL          = dbService.conf.api.endpointURLS.dataMgr.basePath;
    this.upDataURL        = dbService.conf.api.endpointURLS.dataMgr.uploadData;
    this.delFileURL       = dbService.conf.api.endpointURLS.dataMgr.deleteFile;
    this.setCoverPhotoURL = dbService.conf.api.endpointURLS.dataMgr.setCoverPhoto;
    this.fetchGalleryURL  = dbService.conf.api.endpointURLS.dataMgr.fetchGallery;
    this.uploadSingleURL  = dbService.conf.api.endpointURLS.dataMgr.uploadSingle;
  }

  ngAfterViewInit() {
    this.loadPhotos();

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this._render.listen(this.dropBox.nativeElement, eventName, this.preventDefaults);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      this._render.listen(this.dropBox.nativeElement, eventName, this.highlight);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this._render.listen(this.dropBox.nativeElement, eventName, this.unhighlight);
    });

    this._render.listen(this.dropBox.nativeElement, 'drop', this.handleDrop);
  }

  preventDefaults = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }

  highlight = (e: Event) => {
    this._render.addClass(this.dropBox.nativeElement, 'bg-rose-200');
  }

  unhighlight = (e: Event) => {
    this._render.removeClass(this.dropBox.nativeElement, 'bg-rose-200');
  }

  handleDrop = (e: DragEvent) => {
    const formData = new FormData();
    const dt = e.dataTransfer;
    const files: FileList = dt!.files;

    Array.from(files).forEach(file => (file.type === "image/jpeg") ? formData.append('file', file) : null);
    this.uploadFiles(formData);
  }

  setCoverPhoto(e: Event, id: string, photoName: string) {
    let allFigcaptions = this.dropBox.nativeElement.querySelectorAll("figcaption");
    allFigcaptions.forEach(item=>{
      item.classList.remove("!bg-pink-500");
    });

    let clicked = (e.target as HTMLElement).closest('div.card')?.querySelector('figcaption')!;
    clicked.classList.add("!bg-pink-500");

    this.dbService.setCoverPhoto(id, this.baseURL+this.setCoverPhotoURL, photoName, this.useSchema).subscribe(
      {
        next: (result) => {
          // console.log(result);
        },
        error:(err) => {
          this.errBox(err);
          console.log(err);
        }
      }
    )
  }

  refreshGrid(e: Event) {
    this.loadPhotos();
  }

  deletePhoto(e: Event, id: string, photoName: string) {
    if(confirm('powierdz usuniecie')) {
      let rmv = (e.target as HTMLElement).closest('div.card')!;
      rmv.classList.add("hidden");

      this.dbService.deleteFile(id, this.baseURL+this.delFileURL, photoName, this.useSchema).subscribe(
        {
          next: () => {},
          error: (err) => {
            this.errBox(err);
            console.log(err);
          }
        });
    }
  }

  ngOnChanges() {
    this.loadPhotos();
  }

  loadPhotos() {
    if(!!this.uniqID && !!this.useSchema) {
      this.data$ = this.dbService.fetchGallery(this.uniqID, this.baseURL+this.fetchGalleryURL, this.useSchema);
    }
  }

  uploadFiles = (data: FormData) => {
    if (!!this.uniqID) {
      this.dbService.uploadData(this.uniqID, this.baseURL+this.upDataURL, this.useSchema, data).subscribe(
        {
          next: (e) => {
            if (e.type === HttpEventType.UploadProgress) {
              this.progressValue = Math.round(e.loaded / e.total! * 100);
            } else if (e.type === HttpEventType.Sent) {
              this.loadPhotos();
              this.progressValue = 0;
            }
          },
          error: (err: HttpErrorResponse) => {
            this.errBox(err);
            console.log(err);
          }
        });
    }
  }
}
