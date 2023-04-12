import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { PaginationComponent } from './shared/Components/pagination/pagination.component';
import { JwtInterceptor } from './security/interceptors/jwt.interceptor';
import { HttpErrorInterceptor } from './security/interceptors/http-error.interceptor';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './security/services/auth.service';
import { LoginComponent } from './security/components/login/login.component';
import { ProfileComponent } from './security/components/profile/profile.component';

export function jwtOptionFactor(authService:AuthService){
  return {
    tokenGetter:() => {
      return authService.getAccessToken();
    },
    allowedDomains:["localhost:8080"],
    disallowedRoutes:[
      "http://localhost:8080/login"
    ]
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    CoreModule,
    JwtModule.forRoot(
      {
        jwtOptionsProvider : {
          provide : JWT_OPTIONS,
          useFactory : jwtOptionFactor,
          deps : [AuthService]
        }
      }
    )
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
