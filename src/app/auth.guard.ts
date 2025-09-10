import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './services/auth-service';
import {catchError, map, of} from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  // On interroge le backend via le service
// On doit renvoyer trueou false
  return auth.getUserProfile().pipe(
    map(() => true), // connecté → on laisse passer
    catchError(() => {
      router.navigate(['/login']); // non connecté → on redirige
      return of(false); // et on bloque l'accès
    })
  );
};
