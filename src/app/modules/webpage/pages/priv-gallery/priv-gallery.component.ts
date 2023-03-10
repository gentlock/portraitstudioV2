import {AfterViewInit, Component} from '@angular/core';
import {DbService} from "../../../../core/data/db.service";
import {apiUrls, IPortfolioFeed} from "../../../../core/abstracts";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {elapsedTime} from "../../../../core/libs";
import {LoaderService} from "../../../../core/services/loader/loader.service";

@Component({
  selector: 'app-priv-gallery',
  templateUrl: './priv-gallery.component.html',
  styleUrls: ['./priv-gallery.component.scss']
})
export class PrivGalleryComponent implements AfterViewInit{
  readonly elapTime = elapsedTime;
  readonly urls: apiUrls;
  readonly urlD;
  datasource!: IPortfolioFeed;
  deck: string[] = [];

constructor(
  private dbService: DbService,
  private route: ActivatedRoute,
  private loaderService: LoaderService,
) {
  this.urls = dbService.conf.api.endpointURLS.portfolio;
  this.urlD = dbService.conf.api.endpointURLS.utils;
}
ngAfterViewInit() {
  this.deck = [];
  let id = this.route.snapshot.paramMap.get('id');
  // console.log(id);

  if(!!id) {

    this.dbService.getById(id,this.urls.basePath+this.urls.getById).subscribe(
      {
        next: value => {

          this.deck.push(`./assets/img/upload/${value._id}/${value.coverPhoto}`);

          [...value.gallery].forEach(img=>{
              this.deck.push(`./assets/img/upload/${value._id}/${img}`);
          });

          this.loaderService.preloadImg(this.deck,()=>{
            this.datasource = value;
          });

        },
        error: err => {}
      }
    );
  }

  // this.service$ = this.route.paramMap
  // .pipe(
  //   map((params:ParamMap) => parseInt((params.get('id') as string) || '1')),
  //   filter(Id => !!Id),
  //   switchMap( (Id:number) => this.myService.getById(Id) )
  // );
}
}
