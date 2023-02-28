// import {v4 as uuidv4} from 'uuid';
import * as moment from "moment";
import {FormGroup} from "@angular/forms";

export const imgPreloader = {
  _preload: (src: string) => new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src);
    img.onerror = () => reject(src);
    img.src = src;
  }),
  preloadAll: (srcs: string[]) => Promise.all(srcs.map(imgPreloader._preload)),
}

export function clearFormField(e: Event, controlName: string, refForm: FormGroup) {
  e.preventDefault();
  refForm.get(controlName)?.setValue(null);
}

export function elapsedTime(date: Date|undefined) {
  moment.locale("pl");
  return moment(moment(date).format('X'), 'X').subtract('minutes').fromNow();
}

export function readScreenBreakPoints(refHtmlBody: HTMLElement):string {
  return window
    .getComputedStyle(refHtmlBody, ':after')
    .getPropertyValue('content');
}

// export function generateUuid(): string {
//   return uuidv4();
// }

export const myPasswordGenerator = {
  _pattern: new RegExp(/[a-zA-Z0-9_\-\+\.]/),

  _getRandomByte: () => {
    let result = new Uint8Array(1);
    window.crypto.getRandomValues(result);
    return result[0];
  },

  generate: (length: number) => {
    return Array.apply(null, new Array(length)).map(() => {
      let result;
      while (true) {
        result = String.fromCharCode(myPasswordGenerator._getRandomByte());
        if (myPasswordGenerator._pattern.test(result)) {
          return result;
        }
      }
    }, this).join('');
  }
};
