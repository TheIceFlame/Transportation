import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService);
  // const router = inject(Router);
  //
  // const loggedUser = authService.getLoggedUser();
  //
  // console.log(loggedUser)
  //
  // const isAuthPage = ['SignIn', 'Registration'].includes(route.routeConfig?.path || '');
  //
  // console.log(isAuthPage)
  // console.log(route.routeConfig?.path)
  //
  // if (!loggedUser) {
  //   // Not logged in → always redirect to SignIn
  //   if (route.routeConfig?.path !== 'SignIn' && route.routeConfig?.path !== 'Registration') {
  //     router.navigate(['/SignIn']);
  //     return false;
  //   }
  //   return true;
  // }
  //
  // if (loggedUser && isAuthPage) {
  //   // Logged in but trying to access SignIn or Registration → redirect to Request
  //   router.navigate(['/Request']);
  //   return false;
  // }
  //
  // return true;
  return true
};
