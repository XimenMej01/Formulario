import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Solo permite entrar al dashboard si existe una sesión iniciada.
  return authService.estaAutenticado()
    ? true
    : router.createUrlTree(['/login']);
};
