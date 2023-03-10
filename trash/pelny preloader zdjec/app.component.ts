import { AfterViewInit, Component } from '@angular/core';
import { ImagePreloader, Deck } from './ImagePreloader';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    let ip = new ImagePreloader();
    let decks = Array.prototype.slice.call(document.querySelectorAll('.deck'));
    
     decks.forEach( (deck, index)=> {
      Deck(deck, ip, index);
    });

    ip.preload();
  }
}
