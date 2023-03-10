'use strict';

interface IImagePreloader {
    items: any[];

    defer(): {resolve: undefined; reject: undefined; promise: Promise<unknown>;};
    queue(array: any): Promise<unknown>;
    preloadImage(path: string): Promise<unknown>;
    preload(): Promise<any[]>;
    noop():void;
}

const parseJSON = (inputString:string, fallback:Function) => {
    if (inputString) {
      try {
        return JSON.parse(inputString);
      } catch (e) {
        fallback();
      }
    }
  };

  const parseJSONFallback = () => {
    console.log('problem z zaladowaniem json');
  }

export const Deck = (node: HTMLElement, preloader: IImagePreloader, index: number) => {
    let data = parseJSON(node.getAttribute('data-images')!, parseJSONFallback);

    if(data) {
        preloader.queue(data).then(()=>{
            console.log('Deck ' + index + ' loaded.');
            // args.node.classList.add('loaded');
        });
    }
  };

export class ImagePreloader implements IImagePreloader {
  items: any[] = [];

  noop() {}

  defer() {
    let resolve, reject, promise = new Promise(function (a, b) {
      resolve = a;
      reject = b;
    });

    return {
      resolve: resolve,
      reject: reject,
      promise: promise
    };
  }

  queue(array: any[]) {
    if(!Array.isArray(array)) {
      array = [array];
    }

    let deferred = this.defer();

    this.items.push({
      collection: array,
      deferred: deferred || this.noop
    });

    return deferred.promise;
  } 
/*
* @param  {String} path - Image url
* @return {Promise}
*/
  preloadImage(path: string) {
    return new Promise(function(resolve, reject)  {
      let image = new Image();
      image.onload  = resolve;
      image.onerror = resolve;
      image.src     = path;
    });
  }

  preload() {
    let deck, decks: any[] = [];

    // Get the length of the biggest deck
    let max = Math.max.apply(Math, this.items.map( el => {
        return el.collection.length;
    }));

      for(let i=0; i<max; i++) {
        this.items.forEach( (item) => {
          if(typeof item.collection[i] != undefined) {
            item.collection[i] = this.preloadImage(item.collection[i]);
          }
        }, this);
      }

    this.items.forEach( item => {
      deck = Promise.all(item.collection)
        .then(item.deferred.resolve.bind(item.deferred))
        .catch(console.log.bind(console));

      decks.push(deck);
    });

    return Promise.all(decks);
  };
}
