import {Component, EventEmitter, Output, Input, AfterViewInit, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {apiUrls, IMyserviceFeed} from "../../../../core/abstracts";
import {DbService} from "../../../../core/data/db.service";
import { errHandler } from "../../../../core/services/err/errHandler";

@Component({
  selector: 'app-table-bar',
  templateUrl: './table-bar.component.html',
  styleUrls: ['./table-bar.component.scss']
})
export class TableBarComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() currentUrls!: apiUrls;
  data$!: Observable<any>;
  services$!: Observable<IMyserviceFeed[]>;
  @Output() editRequest: EventEmitter<any> = new EventEmitter();
  @Output() deleteRequest: EventEmitter<any> = new EventEmitter();
  @Output() resetFormRequest: EventEmitter<any> = new EventEmitter();
  @Input() events!: Observable<string>;
  @Input() selectableService!: boolean;
  eventsSubscription!: Subscription;
  currentCard = "";
  errBox = errHandler();

  constructor(
    private dbService: DbService
  ) {

  }

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
  refreshTable() {
    console.log(this.currentUrls.basePath + this.currentUrls.getAll);
    this.data$ = this.dbService.getAll(this.currentUrls.basePath + this.currentUrls.getAll);
  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((id) => {
      this.currentCard = id;
      this.refreshTable();
    } );
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    // this.services$ = this.dbService.getAll(this.currentUrls.getAll);
    this.refreshTable();
  }
}
