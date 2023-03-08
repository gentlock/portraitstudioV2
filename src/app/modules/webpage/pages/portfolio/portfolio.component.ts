import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {apiUrls, IDBResult, IMyserviceFeed, IPortfolioFeed, TDBQuery} from "../../../../core/abstracts";
import {DbService} from "../../../../core/data/db.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  @ViewChild("tabsNav") tabsNav!: ElementRef;
  myservices$!: Observable<IMyserviceFeed[]> ;
  data$!: Observable<IDBResult<IPortfolioFeed|IMyserviceFeed>>;
  readonly urlsS: apiUrls;
  readonly urlsP: apiUrls;
  showDetails = false;
  id = "";

  constructor(
    private dbService: DbService
  ) {

    this.urlsS = dbService.conf.api.endpointURLS.myservices;
    this.urlsP = dbService.conf.api.endpointURLS.portfolio;
    this.myservices$  = dbService.getAll(this.urlsS.basePath+this.urlsS.getAll);

    this.fetchGal({});
  }

  fetchGal(query: object) {
    let options = {
      pagination: true,
      page: 1,
      limit: 10,
      sort: { addDate: -1 },
    }
    let data: TDBQuery = {query, options};

    this.data$ = this.dbService.fetchQuery(this.urlsP.basePath+this.urlsP.fetchQuery, data);
  }

  switchTab(id: string, e: Event) {
    e.preventDefault();
    this.showDetails  = false;
    this.id           = "";

    (this.tabsNav.nativeElement as HTMLUListElement).querySelectorAll('a').forEach(item=>{
      item.classList.remove('!text-white');
    });

    (e.target as HTMLLIElement).classList.add('!text-white');

    if(id != '') {
      this.fetchGal({serviceId: id});
    } else {
      this.fetchGal({});
    }
  }

  switchView(e: Event, id: string) {
    this.showDetails = true;
    this.id = id;

    this.fetchGal({_id: id});
  }
}
