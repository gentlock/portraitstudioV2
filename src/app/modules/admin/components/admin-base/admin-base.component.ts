import {AfterViewInit, Component} from '@angular/core';
import {AuthService} from "../../../../core/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.scss'],
})
export class AdminBaseComponent implements AfterViewInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  ngAfterViewInit() {
    let navbar = document.querySelector('.navbar')!
    let navbarWidth = (navbar as HTMLElement).offsetWidth;
    let main = document.querySelector('main')!;

    (navbar as HTMLDivElement).style.height = `${document.body.clientHeight}px`;

    main.style.marginLeft = `${navbarWidth}px`;

    const  callback = (entries: ResizeObserverEntry[]) => {
      for (let  entry of entries) {
        (navbar as HTMLDivElement).style.height = `${entry.contentRect.height}px`;
      }
    };

    new ResizeObserver(callback).observe(document.body);
  }

  logOut(e: Event) {
    this.authService.logOut();
    this.router.navigate(['admin']);
  }
}
