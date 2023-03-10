import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import {DbService} from "../../../../core/data/db.service";
import {Observable} from "rxjs";
import {apiUrls, IMyserviceFeed} from "../../../../core/abstracts";
import {LoaderService} from "../../../../core/services/loader/loader.service";

@Component({
  selector: 'app-myservices',
  templateUrl: './myservices.component.html',
  styleUrls: ['./myservices.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyservicesComponent implements AfterViewInit {
  myservices!: IMyserviceFeed[];
  datasource!: IMyserviceFeed;
  readonly urls: apiUrls;
  showDetails = false;
  id = "";
  deck: string[] = [];

  constructor(
    private dbService: DbService,
    private loaderService: LoaderService,
  ) {
    this.urls = dbService.conf.api.endpointURLS.myservices;
  }

  ngAfterViewInit() {
    this.deck = [];

    this.dbService.getAll(this.urls.basePath+this.urls.getAll).subscribe(
      {
        next: (el=>{
          el.forEach(item=>{
            this.deck.push(`./assets/img/upload/${item._id}/${item.coverPhoto}`);
          })

          this.loaderService.preloadImg(this.deck,()=>{
            this.myservices = el;
          });
        }),
        error: err => {}
      }
    )
  }

  switchView(e: Event, id: string) {
    this.showDetails = true;
    this.id = id;
    this.deck = [];

    this.dbService.getById( this.id, this.urls.basePath+this.urls.getById ).subscribe(
      {
        next: (el=>{
          [...el.gallery].forEach(img=>{
            this.deck.push(`./assets/img/upload/${el._id}/${img}`);
          })

          this.loaderService.preloadImg(this.deck,()=>{
            this.datasource = el;
          });
        }),
        error: err => {}
      }
    )
  }
}
