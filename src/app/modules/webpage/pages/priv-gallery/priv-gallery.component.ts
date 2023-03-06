import {AfterViewInit, Component} from '@angular/core';
import {DbService} from "../../../../core/data/db.service";
import {apiUrls, IPortfolioFeed} from "../../../../core/abstracts";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {elapsedTime} from "../../../../core/libs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-priv-gallery',
  templateUrl: './priv-gallery.component.html',
  styleUrls: ['./priv-gallery.component.scss']
})
export class PrivGalleryComponent implements AfterViewInit{
  readonly elapTime = elapsedTime;
  readonly urls: apiUrls;
  readonly urlD;
  data$!: Observable<IPortfolioFeed>;
constructor(
  private dbService: DbService,
  private route: ActivatedRoute
) {
  this.urls = dbService.conf.api.endpointURLS.portfolio;
  this.urlD = dbService.conf.api.endpointURLS.utils;
}
ngAfterViewInit() {
  let id = this.route.snapshot.paramMap.get('id');
  console.log(id);

  if(!!id) {
    this.data$ = this.dbService.getById(id,this.urls.basePath+this.urls.getById);
  }

  // this.service$ = this.route.paramMap
  // .pipe(
  //   map((params:ParamMap) => parseInt((params.get('id') as string) || '1')),
  //   filter(Id => !!Id),
  //   switchMap( (Id:number) => this.myService.getById(Id) )
  // );
}
}
