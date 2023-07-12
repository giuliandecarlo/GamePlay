import { CanActivateFn } from '@angular/router';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const profileGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)
  if(userService.auth){return true;}
  router.navigate(['/login'],{queryParams:{returnUrl: state.url}});
  return false;
};
