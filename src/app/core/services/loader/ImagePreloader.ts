'use strict';

type TOptions = {
  parallel: boolean;
  items: any[];
  max: number;
}
export class ImagePreloader {
  parallel: boolean = true;
  max: number = 0;
  items: any[] = [];
  constructor(options: TOptions) {
    this.parallel = options.parallel;
    this.max      = options.max;
    this.items    = options.items;
  }
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

  queue(array: any) {
    if(!Array.isArray(array)) {
      array = [array];
    }

    if(array.length > this.max) {
      this.max = array.length;
    }

    let deferred = this.defer();

    this.items.push({
      collection: array,
      deferred: deferred
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

    if(this.parallel) {
      for(let i=0; i<this.max; i++) {
        this.items.forEach( (item) => {
          if(typeof item.collection[i] != undefined) {
            item.collection[i] = this.preloadImage(item.collection[i]);
          }
        }, this);
      }
    } else {
      this.items.forEach( (item) => {
        item.collection = item.collection.map(this.preloadImage);
      }, this);
    }

    this.items.forEach( (item) => {
      deck = Promise.all(item.collection)
        .then(item.deferred.resolve.bind(item.deferred))
        .catch(console.log.bind(console));

      decks.push(deck);
    });

    return Promise.all(decks);
  };
}
