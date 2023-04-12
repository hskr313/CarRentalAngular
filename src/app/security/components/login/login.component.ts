import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  fg: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  constructor(
    private $authservice: AuthService,
    private $router: Router
  ){
  }

  onSubmit(){
    this.$authservice.login(this.fg.value as LoginModel).subscribe( (data) => {
      if (data) {
        this.$router.navigate(['/']);
      }
    })
  }

}
