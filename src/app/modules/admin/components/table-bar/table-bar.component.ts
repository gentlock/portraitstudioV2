import {Component, EventEmitter, Output, Input, AfterViewInit, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {apiUrls, IDBResult, IMyserviceFeed, IPortfolioFeed, TDBQuery} from "../../../../core/abstracts";
import {DbService} from "../../../../core/data/db.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-table-bar',
  templateUrl: './table-bar.component.html',
  styleUrls: ['./table-bar.component.scss']
})
export class TableBarComponent implements OnDestroy, OnInit, AfterViewInit {
  @Input() currentUrls!: apiUrls;
  @Output() editRequest: EventEmitter<any> = new EventEmitter();
  @Output() deleteRequest: EventEmitter<any> = new EventEmitter();
  @Output() resetFormRequest: EventEmitter<any> = new EventEmitter();
  @Input() events!: Observable<string>;
  @Input() selectableService!: boolean;
  eventsSubscription!: Subscription;
  currentCard = "";
  datasource!: (IPortfolioFeed|IMyserviceFeed)[];
  pageIndex = 0;
  pageSize = 2;
  length!: number;

  constructor(
    private dbService: DbService
  ) {}

  resetActiveCards() {
    document.querySelectorAll('div.card').forEach((item) => {
      item.classList.remove('bg-rose-100');
    })
  }
  editThis(e: Event, id: string) {
    e.preventDefault();
    this.resetActiveCards();

    let div = (e.target as HTMLElement).closest('div.card')!;
    div.classList.add('bg-rose-100');
    this.currentCard = id;

    this.editRequest.emit(id);
  }

  deleteThis(e: Event, id: string) {
    e.preventDefault();

    if(prompt('wpisz słowo: tak') === 'tak') {
      this.deleteRequest.emit(id);
    }
  }

  resetForm() {
    this.resetFormRequest.emit();
  }

  public getServerData(e:PageEvent|null) {
    let index = e?.pageIndex || this.pageIndex;

    let query = {};
    let options = {
      pagination: true,
      // page: this.pageIndex,
      offset: index*this.pageSize,
      limit: this.pageSize,
      // sort: { addDate: -1 },
    }

    this.dbService.fetchQuery(this.currentUrls.basePath+this.currentUrls.fetchQuery, {query, options}).subscribe(
      {
        next: (data) => {
          this.datasource = data.docs;
          this.pageSize   = data.limit;
          this.length     = data.totalDocs;
        },
        error: (err)=> {}
      }
    );

    return e;
  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((id) => {
      this.currentCard = id;
      this.getServerData(null);
    });
  }

  ngAfterViewInit() {
    this.getServerData(null);
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
