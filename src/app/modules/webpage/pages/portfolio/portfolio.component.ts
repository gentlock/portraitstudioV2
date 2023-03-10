import {AfterViewInit, Component, ElementRef, Renderer2, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {Observable} from "rxjs";
import {apiUrls, IMyserviceFeed, IPortfolioFeed} from "../../../../core/abstracts";
import {DbService} from "../../../../core/data/db.service";
import {LoaderService} from "../../../../core/services/loader/loader.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements AfterViewInit {
  @ViewChild("tabsNav") tabsNav!: ElementRef;
  @ViewChild('cardsContainer', { read: ViewContainerRef }) cardsContainer!: ViewContainerRef;
  @ViewChild('cardTpl', {read: TemplateRef}) cardTpl!: TemplateRef<any>;
  myservices$!: Observable<IMyserviceFeed[]> ;
  datasource!: (IPortfolioFeed|IMyserviceFeed)[];
  readonly urlsS: apiUrls;
  readonly urlsP: apiUrls;
  showDetails = false;
  id = "";
  readonly pageSize = 4;
  currentOffset = 0;
  queryFilter = {};
  isloadMoreBtnDisabled = false;
  deck: string[] = [];

  constructor(
    private dbService: DbService,
    private loaderService: LoaderService,
  ) {
    this.urlsS = dbService.conf.api.endpointURLS.myservices;
    this.urlsP = dbService.conf.api.endpointURLS.portfolio;
    this.myservices$  = dbService.getAll(this.urlsS.basePath+this.urlsS.getAll);
  }

  fetchGal(isPaginate:boolean) {
    let offset: number;
    let curPage: number;
    let totalPages: number;
    this.deck = [];

    if(isPaginate) {
      offset = this.currentOffset;
    } else {
      offset = 0;
      this.isloadMoreBtnDisabled = true;
    }

    let query = this.queryFilter;
    let options = {
      pagination: isPaginate,
      offset: offset*this.pageSize,
      limit: this.pageSize,
      sort: { addDate: -1 },
    }

    this.dbService.fetchQuery(this.urlsP.basePath+this.urlsP.fetchQuery, {query, options}).subscribe(
      {
        next: (data) => {
          curPage         = data.page;
          totalPages      = data.totalPages;

          if(!this.showDetails) {
            this.deck = [];
            data.docs.forEach(item => {
              this.deck.push(`./assets/img/upload/${item._id}/${item.coverPhoto}`);

              this.loaderService.preloadImg(this.deck,()=>{
                this.cardsContainer.createEmbeddedView(this.cardTpl, {doc: item});
              });
            })
          } else {
            this.deck = [];
            data.docs.forEach(item=>{
              item.gallery?.forEach(img=>{
                this.deck.push(`./assets/img/upload/${item._id}/${img}`);
              });
            });

            this.loaderService.preloadImg(this.deck,()=>{
              this.datasource = data.docs;
            });
          }
          // console.log(this.cardsContainer.length);
          if(curPage >= totalPages) this.isloadMoreBtnDisabled = true;
          this.currentOffset++;
        },
        error: (err)=> {}
      }
    );
  }
  loadMore(e:Event) {
    e.preventDefault();
    this.fetchGal(true);
  }
  switchTab(id: string, e: Event) {
    e.preventDefault();
    this.isloadMoreBtnDisabled = false;
    this.currentOffset = 0;
    this.id           = "";

    if(this.showDetails) {
      this.showDetails  = false;
    } else {
      this.cardsContainer.clear();
    }

    (this.tabsNav.nativeElement as HTMLUListElement).querySelectorAll('a').forEach(item=>{
      item.classList.remove('!text-white');
    });

    (e.target as HTMLLIElement).classList.add('!text-white');

    if(id != '') {
      this.queryFilter = {serviceId: id};
      this.fetchGal(true);
    } else {
      this.queryFilter = {};
      this.fetchGal(true);
    }
  }

  ngAfterViewInit() {
    this.fetchGal(true);
  }

  switchView(e: Event, id: string) {
    this.isloadMoreBtnDisabled = false;
    this.showDetails = true;
    this.id = id;

    this.queryFilter = {_id: id};
    this.fetchGal(false);
  }
}
