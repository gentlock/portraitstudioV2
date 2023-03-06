import {AfterViewInit, Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import { DbService } from '../../../../core/data/db.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent implements AfterViewInit {
  @Output() loadingComplete: EventEmitter<any> = new EventEmitter();

  constructor(
    private dbService: DbService,
  ) {}

  // DOM utility functions:
  private el = (sel: string, par: Element) => (par || document).querySelector(sel);
  private els = (sel: string, par?: Element | null) => (par || document).querySelectorAll(sel);
  private elNew = (tag: string, prop: Object) => Object.assign(document.createElement(tag), prop);

  // Helper functions:
  private mod = (n: number, m: number) => (n % m + m) % m;

  private carousel = (elCarousel: any) => {
    const animation = 500;
    const pause = 5000;

    const elCarouselSlider = this.el(".carousel-slider", elCarousel);
    const elsSlides = this.els(".carousel-slide", elCarouselSlider);
    const elsBtns: HTMLElement[] = [];

    let itv: number // Autoslide interval
    let tot = elsSlides.length; // Total slides
    let c = 0;

    let touchstartX = 0
    let touchendX = 0

    if (tot < 2) return; // Not enough slides. Do nothing.

    // Methods:
    const checkDirection = () => {
      if (touchendX < touchstartX) {
        next();
        // alert('swiped left!');
      }
      if (touchendX > touchstartX) {
        prev();
        // alert('swiped right!');
      }
    }
    const anim = (ms = animation) => {
      const cMod = this.mod(c, tot);

      // Move slider
      (elCarouselSlider as HTMLElement).style.transitionDuration = `${ms}ms`;
      (elCarouselSlider as HTMLElement).style.transform = `translateX(${(-c - 1) * 100}%)`;

      // Handle active classes (slide and bullet)
      elsSlides.forEach((elSlide, i) => elSlide.classList.toggle("is-active", cMod === i));
      // elsBtns.forEach((elBtn: any, i: number) => elBtn.classList.toggle("is-active", cMod === i));
    };

    const prev = () => {
      if (c <= -1) return; // prevent blanks on fast prev-click
      c -= 1;
      anim();
    };

    const next = () => {
      if (c >= tot) return; // prevent blanks on fast next-click
      c += 1;
      anim();
    };

    const goto = (index: number) => {
      c = index;
      anim();
    };

    const play = () => {
      itv = window.setInterval(next, pause + animation);
    };

    const stop = () => {
      window.clearInterval(itv);
    };

    // Buttons:

    const elPrev = this.elNew("button", {
      type: "button",
      className: "carousel-prev",
      innerHTML: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z\"/></svg>",
      onclick: () => prev(),
    });

    const elNext = this.elNew("button", {
      type: "button",
      className: "carousel-next",
      innerHTML: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z\" /></svg>",
      onclick: () => next(),
    });

    // Navigation:
    const elNavigation = this.elNew("div", {
      className: "carousel-navigation",
    });

    // Navigation bullets:
    // for (let i = 0; i < tot; i++) {
    //   const elBtn = this.elNew("button", {
    //     type: "button",
    //     className: "carousel-bullet",
    //     onclick: () => goto(i)
    //   });
    //   elsBtns.push(elBtn);
    // }

    // Infinite slide effect:
    (elCarouselSlider as HTMLElement).addEventListener("transitionend", () => {
      if (c <= -1) c = tot - 1;
      if (c >= tot) c = 0;
      anim(0); // quickly switch to "c" slide (with animation duration 0)
    });

    // Pause on pointer enter:
    elCarousel.addEventListener("pointerenter", () => stop());
    elCarousel.addEventListener("pointerleave", () => play());

    // swipe detection
    elCarousel.addEventListener('touchstart', (e: TouchEvent) => {
      touchstartX = e.changedTouches[0].screenX;
    })

    elCarousel.addEventListener('touchend', (e: TouchEvent) => {
      touchendX = e.changedTouches[0].screenX;
      checkDirection();
    })

    // Init:

    // Insert UI elements:
    elNavigation.append(...elsBtns);
    elCarousel.append(elPrev, elNext, elNavigation);

    // Clone first and last slides (for "infinite" slider effect)
    (elCarouselSlider as HTMLElement).prepend(elsSlides[tot - 1].cloneNode(true));
    (elCarouselSlider as HTMLElement).append(elsSlides[0].cloneNode(true));

    // Initial slide
    anim();
    // Start autoplay
    play();
  }

  ngAfterViewInit() {
    let url = this.dbService.conf.api.endpointURLS.myservices.basePath + this.dbService.conf.api.endpointURLS.myservices.getAll;

    // let mainRef = document.querySelector('main')!;
    //
    // const  callback = (entries: ResizeObserverEntry[]) => {
    //   for (let  entry of entries) {
    //     console.log(entry.contentRect.width);
    //     // (mainRef as HTMLDivElement).style.height = `${entry.contentRect.height}px`;
    //   }
    // };
    //
    // new ResizeObserver(callback).observe(mainRef);



    this.dbService.getAll(url).subscribe(
      {
        next: (el => {
            el.forEach(item => {

              const elImg = this.elNew("img", {src: `./assets/img/upload/${item._id}/${item.coverPhoto}`});
              const elLi = this.elNew("li", {className: "carousel-slide"});

              const elDivImg = this.elNew("div", {className: "img-container"});
              const elDiv = this.elNew("div", {className: "content"});
              const elSpanTitle = this.elNew("div", {className: ["title"], innerHTML: item.name});
              const elSpanSubtitle = this.elNew("div", {className: "subtitle", innerHTML: item.subtitle});
              const elSpanDesc = this.elNew("div", {className: "desc", innerHTML: item.desc});
              elDiv.append(elSpanTitle);
              elDiv.append(elSpanSubtitle);
              elDiv.append(elSpanDesc);
              elDivImg.append(elImg);

              elLi.append(elDivImg);
              elLi.append(elDiv);
              document.querySelector('.carousel-slider')!.append(elLi);
            })

            this.els(".carousel").forEach(this.carousel);
          }
        ),
        error: (err => {
          console.log(err)
        })
      })

  }
}
