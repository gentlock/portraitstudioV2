import { Component } from '@angular/core';
import {LoaderService} from "../../../../core/services/loader/loader.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  deck: string[] = [];
  constructor(
    private loaderService: LoaderService,
  ) {
    this.deck.push('./assets/img/static/about.jpg');
    this.loaderService.preloadImg(this.deck,null);
  }
}
