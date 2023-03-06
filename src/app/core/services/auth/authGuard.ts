import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from "./auth.service";

export function authGuard({
  redirectTo,
  isProtected = true
}: {
  redirectTo?: any[];
  isProtected?: boolean;
} = {}): CanMatchFn {
  return () => {
    const authService = inject(AuthService);
    const router      = inject(Router);
    const isLoggedIn  = authService.isLoggedId();

    if(isProtected) {
      if(isLoggedIn) {
        return true;
      }

      return router.createUrlTree(redirectTo ?? ['loginPage']);
    } else {
      if(!isLoggedIn) {
        return true;
      }

      return router.createUrlTree(redirectTo ?? ['admin']);
    }
  }
}
