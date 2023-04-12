import { Component } from '@angular/core';
import { User } from 'src/app/security/models/user.model';
import { AuthService } from 'src/app/security/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private authService: AuthService) {}
  
  userProfile?: User | null;
 
  ngOnInit(): void {
    this.authService.userSubject.subscribe((data) => {
      this.userProfile = data;
    });
  }

}
