import { Component } from '@angular/core';
import { DbService } from '../../../../core/data/db.service';
import { HttpClient } from '@angular/common/http';
import { IMyserviceFeed, IAlbumsFeed } from '../../../../core/abstracts';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  constructor(private dbService: DbService, private http: HttpClient) {}

  myservicesGetAll() {}
  myservicesGetById(is: string) {}
  myservicesAddNew(data: IMyserviceFeed) {}
  myservicesUpdate(id: string) {}
  myservicesDel(is: string) {}
}
