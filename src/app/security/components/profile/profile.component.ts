import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  
  user! : User

  constructor(
    private $authservice: AuthService
  ){
  }

  ngOnInit(){
    this.profile()
  }

  profile(){
    this.$authservice.getProfile().subscribe(
      (data) => {
        this.user = data
        console.log(data);
         
      } 
    )
  }

}
