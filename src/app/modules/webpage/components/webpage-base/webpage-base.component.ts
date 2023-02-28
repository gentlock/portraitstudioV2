import { AfterViewInit, Component } from '@angular/core';
// import * as anime from 'animejs';
@Component({
  selector: 'app-webpage-base',
  templateUrl: './webpage-base.component.html',
  styleUrls: ['./webpage-base.component.scss'],
})
export class WebpageBaseComponent implements AfterViewInit {
  currentYear = new Date().getFullYear();

  backtotop(e: Event) {
    e.preventDefault();

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  ngAfterViewInit() {
    const sectionOne = document.querySelector('.pixelToWatch')!;
    const header = document.querySelector('header')!;
    const nav = header.querySelector('nav')!;
    const article = document.querySelector('article')!;

    const sectionOneOptions = { rootMargin: '-10px 0px 0px 0px' };

    const sectionOneObserver = new IntersectionObserver(
      (entries, sectionObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            header.classList.add('shadow-shadow-dark0');
            nav.classList.remove('!h-28');
            article.classList.remove('md:!pt-28');
          } else {
            header.classList.remove('shadow-shadow-dark0');
            nav.classList.add('!h-28');
            article.classList.add('md:!pt-28');
          }
        });
      },
      sectionOneOptions
    );

    sectionOneObserver.observe(sectionOne);
  }
}
