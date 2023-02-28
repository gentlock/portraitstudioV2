import {Component, EventEmitter, Output, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IMyserviceFeed} from "../../../../core/abstracts";
import {DbService} from "../../../../core/data/db.service";

@Component({
  selector: 'app-table-bar',
  templateUrl: './table-bar.component.html',
  styleUrls: ['./table-bar.component.scss']
})
export class TableBarComponent {
  @Input() useService!: DbService;
  data$!: Observable<any>;
  services$!: Observable<IMyserviceFeed[]>;
  @Output() editRequest: EventEmitter<any> = new EventEmitter();
  @Output() deleteRequest: EventEmitter<any> = new EventEmitter();
  @Output() resetFormRequest: EventEmitter<any> = new EventEmitter();
  @Input() events!: Observable<string>;
  @Input() selectableService!: boolean;
  eventsSubscription!: Subscription;
  currentCard: string = "";

  constructor(
    private dbService: DbService
    // private albumsService: AlbumsService,
  ) {
    this.services$ = dbService.myservicesGetAll();
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
    // this.data$ = this.useService.getAll();
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
    this.refreshTable();
  }
}
