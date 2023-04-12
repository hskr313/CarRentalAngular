import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, lastValueFrom, map, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtToken, User } from '../models/user.model';
import { LoginModel } from '../models/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public userSubject = new BehaviorSubject<User | null>(null);
    $jwtservice : JwtHelperService = new JwtHelperService()
  
  constructor(
    private router: Router,
    private http: HttpClient,
    ) {
    }

    public get userValue(): User | null{
        return this.userSubject.value;
    }

    getAccessToken():string{
        const localStorageToken = localStorage.getItem('tokens');
        if(localStorageToken){
          const token = JSON.parse(localStorageToken) as JwtToken;
          const isTokenExpired = this.$jwtservice.isTokenExpired(token.access_token);
          if(isTokenExpired){
            this.userSubject.next(null);
            return "";
          }
          const userInfo = this.$jwtservice.decodeToken(
            token.access_token
          ) as User;
          this.userSubject.next(userInfo);
          return token.access_token;
        }
        return "";
      }

    login(login : LoginModel) {
        return this.http.post<any>(`${environment.url}/login`, login )
            .pipe(map(data => {
                let token = data as JwtToken
                localStorage.setItem('tokens', JSON.stringify(token))

                const userInfo = this.$jwtservice.decodeToken(token.access_token) as User
                console.log(userInfo);
                

                this.userSubject.next(userInfo);
                this.startRefreshTokenTimer();
                return true;
            }),
                catchError((error) => {
                console.log(error);
                return of(false);
            }));
    }

    logout() {
        // revoke refresh token
        this.http.post<any>(`${environment.url}/logout`, {}).subscribe();
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    refreshToken() : Observable<JwtToken> {
        return this.http.get<any>(`${environment.url}/refreshToken`)
            .pipe(map((data) => {
                let token = data as JwtToken
                localStorage.setItem('tokens', JSON.stringify(token))

                const userInfo = this.$jwtservice.decodeToken(token.access_token) as User

                this.userSubject.next(userInfo);
                this.startRefreshTokenTimer();
                return token;
            }),
                catchError((error) => {
                console.log(error);
                return throwError(() => new Error(error)); 
            }));
    }

    // helper methods

    private refreshTokenTimeout: any;

    private startRefreshTokenTimer() {
        if (this.userValue != null) {
            const jwtToken = JSON.parse(localStorage.getItem('tokens')!) as JwtToken;
            const decodedToken = JSON.parse(window.atob(jwtToken.access_token.split('.')[1]));
            const expires = new Date(decodedToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);
            this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
        }
    }

    private stopRefreshTokenTimer = () => {
    clearTimeout(this.refreshTokenTimeout);
    }

  getProfile(): Observable<User>{
    return this.http.get<User>(environment.url+'/profile')
  }
}

