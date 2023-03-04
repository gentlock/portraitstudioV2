import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {apiUrls, IMyserviceFeed, IPortfolioFeed} from "../../../../core/abstracts";
import {DbService} from "../../../../core/data/db.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  @ViewChild("tabsNav") tabsNav!: ElementRef;
  myservices$!: Observable<IMyserviceFeed[]>;
  data$!: Observable<IPortfolioFeed[]>;
  details$!: Observable<IPortfolioFeed>;
  // selected$!: Observable<IPortfolioFeed>;
  readonly urlsS: apiUrls;
  readonly urlsP: apiUrls;
  showDetails = false;
  id = "";

  constructor(
    private dbService: DbService
  ) {
    this.urlsS        = dbService.conf.api.endpointURLS.myservices;
    this.myservices$  = dbService.getAll(this.urlsS.basePath+this.urlsS.getAll);

    this.urlsP = dbService.conf.api.endpointURLS.portfolio;
    this.data$ = dbService.getAll(this.urlsP.basePath+this.urlsP.getAll);
  }

  switchTab(filter: string, e: Event) {
    e.preventDefault();
    this.showDetails  = false;
    this.id           = "";

    (this.tabsNav.nativeElement as HTMLUListElement).querySelectorAll('a').forEach(item=>{
      item.classList.remove('!text-white');
    });

    (e.target as HTMLLIElement).classList.add('!text-white');

    this.data$ = this.dbService.getAll(this.urlsP.basePath+this.urlsP.getAll, filter);
  }

  switchView(e: Event, id: string) {
    this.showDetails = true;
    this.id = id;

    this.details$ = this.dbService.getById(this.id, this.urlsP.basePath+this.urlsP.getById);
  }
}
