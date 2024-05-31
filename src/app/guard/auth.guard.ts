import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SharedService } from '../services/shared.service';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(SharedService);
  const router = inject(Router);
  const url: string = state.url;

  if (!service.isAuthenticated()) {
    router.navigateByUrl('/login');
    return false;
  }

  if (url.startsWith('/admin') && !service.isAdmin()) {
    router.navigateByUrl('/not-authorized');
    return false;
  }

  return true;
};
