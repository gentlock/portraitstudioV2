import {Component, ViewEncapsulation} from '@angular/core';
import { DbService } from '../../../../core/data/db.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent {
  constructor(
    private dbService: DbService,
  ) {

  }
}
