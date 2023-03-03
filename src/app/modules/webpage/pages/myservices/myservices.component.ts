import {Component, Input} from '@angular/core';
import {DbService} from "../../../../core/data/db.service";
import {Observable} from "rxjs";
import {apiUrls, IMyserviceFeed} from "../../../../core/abstracts";

@Component({
  selector: 'app-myservices',
  templateUrl: './myservices.component.html',
  styleUrls: ['./myservices.component.scss'],
})
export class MyservicesComponent {
  myservices$!: Observable<IMyserviceFeed[]>;
  readonly urls: apiUrls;
  showDetails = "";
  id = "";

  constructor(
    private dbService: DbService
  ) {
    this.urls = dbService.conf.api.endpointURLS.myservices;
    this.myservices$ = dbService.getAll(this.urls.basePath+this.urls.getAll);

  }
}
