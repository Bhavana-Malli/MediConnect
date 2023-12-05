import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title = 'MediConnect';
  userName = '';
  constructor(
    private router: Router,
    private app: AppService
  ) { }

  ngOnInit(): void {
    const user = this.app.getUserInfo();
    if(user) {
      this.userName = `${user.firstname} ${user.lastname}`;
    }
  }
  onLogOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
  onLogoClick(){
    this.router.navigate(['dashboard']);
  }
}
