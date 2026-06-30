import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('user_authenticated') === 'true';

  if (isLoggedIn) {
    return true;
  } else {
    console.warn('Acceso no autorizado detectado. Redirigiendo al Login...');
    router.navigate(['/login']);
    return false;
  }
};