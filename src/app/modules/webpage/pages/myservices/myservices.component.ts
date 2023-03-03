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
  details$!: Observable<IMyserviceFeed>;
  readonly urls: apiUrls;
  showDetails = false;
  id = "";

  constructor(
    private dbService: DbService
  ) {
    this.urls = dbService.conf.api.endpointURLS.myservices;
    this.myservices$ = dbService.getAll(this.urls.basePath+this.urls.getAll);
  }

  switchView(e: Event, id: string) {
    this.showDetails = true;
    this.id = id;

    this.details$ = this.dbService.getById(this.id, this.urls.basePath+this.urls.getById);
  }
}
