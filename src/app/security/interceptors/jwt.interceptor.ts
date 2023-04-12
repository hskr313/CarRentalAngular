import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { User } from '../models/user.model';
import { JwtToken } from '../models/user.model';

const AUTH_ENDPOINTS = ['login', 'refreshToken'];

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Pas d'interception pour les endpoints d'authentification
    if (AUTH_ENDPOINTS.some(url => req.url.includes(url))) {
      return next.handle(req);
    }
 
    const localStorageTokens = localStorage.getItem('tokens');
    if (localStorageTokens) {
      const tokens = JSON.parse(localStorageTokens) as JwtToken;
      const isTokenExpired = this.jwtHelper.isTokenExpired(tokens?.access_token);

      if (!isTokenExpired) {
        // Le jeton n'est pas expiré, on le passe tel quel
        const authReq = req.clone({
          headers: req.headers.set(
            'Authorization', `Bearer ${tokens.access_token}`
          ),
        });
        console.log('1')
        return next.handle(authReq);
      } else {
        console.log('2')
        // Le jeton est expiré, on tente de le rafraîchir
        return this.authService.refreshToken().pipe(
          switchMap((newTokens: JwtToken) => {
            // Mise à jour des tokens et du profil utilisateur
            localStorage.setItem('tokens', JSON.stringify(newTokens));
            const userInfo = this.jwtHelper.decodeToken(newTokens.access_token) as User;
            this.authService.userSubject.next(userInfo);
            
            // Transformation de la requête avec le nouveau jeton
            const authReq = req.clone({
              headers: req.headers.set(
                'Authorization', `bearer ${newTokens.access_token}`
              ),
            });
            return next.handle(authReq);
          }),
          catchError(error => {
            console.log('3')

            // Gestion de l'erreur en cas d'échec du rafraîchissement
            localStorage.removeItem('tokens');
            this.authService.userSubject.next(null);
            this.router.navigate(['/login']);
            return throwError(() => new Error(error));
          })
        );
      }
    }

    // Pas de jeton disponible, on redirige vers la page de login
    this.router.navigate(['/login']);
    return throwError(() => 'Invalid call');
  }
}
