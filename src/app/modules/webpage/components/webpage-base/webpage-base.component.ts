import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-webpage-base',
  templateUrl: './webpage-base.component.html',
  styleUrls: ['./webpage-base.component.scss']
})
export class WebpageBaseComponent implements AfterViewInit {
  ngAfterViewInit() {
    const sectionOne  = document.querySelector('.pixelToWatch')!;
    const header      = document.querySelector('header')!;
    const nav         = header.querySelector('nav')!;
    const article     = document.querySelector('article')!;

    const sectionOneOptions = { rootMargin: "-10px 0px 0px 0px" }

    const sectionOneObserver = new IntersectionObserver(
      (entries, sectionObserver) => {
        entries.forEach((entry=> {
          if(!entry.isIntersecting) {
            header.classList.remove('!drop-shadow-none');
            nav.classList.remove('!h-28');
            article.classList.remove('md:!mt-28');
          } else {
            header.classList.add('!drop-shadow-none');
            nav.classList.add('!h-28');
            article.classList.add('md:!mt-28');
          }
        }))
      }, sectionOneOptions);

    sectionOneObserver.observe(sectionOne);
  }
}
