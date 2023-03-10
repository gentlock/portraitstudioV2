import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ImagePreloader } from "./ImagePreloader";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();

  show() {
    this.isLoading.next(true);
  }

  preloadImg(deck: any[], callback: Function|null) {
    this.show();

    let ip = new ImagePreloader();

    ip.queue(deck).then(()=>{
      // console.log('Deck loaded.');
    });

    setTimeout(()=>{

    }, 1000);

    ip.preload().then(() => {
      setTimeout(()=>{
        if(callback)
          callback();
        this.hide();
      }, 300)
    })
  }

  hide() {
    this.isLoading.next(false);
  }
}
