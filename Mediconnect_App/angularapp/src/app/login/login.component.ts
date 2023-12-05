import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  protected userData = new UserDetails;
  errorMessage = "";
  showMsg: boolean = false;
  isValid: boolean = false;
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.userData = new UserDetails;
  }

  clearinput() {
    this.showMsg = false;
    this.isValid = false;
    this.userData = new UserDetails;
  }

  validateUser() {
    if (this.userData.email == "" || this.userData.email == "") {
      this.isValid = true;
      this.showMsg = false;
    }
    else {
      this.http.post<any>('/login', this.userData).subscribe({
        next: data => {
          if (data.regid == null) {
            this.showMsg = true;
            this.userData = new UserDetails;
            this.router.navigate(['/login']);
          } else {
            this.showMsg = false;
            this.isValid = false;
            if (data.role === 1) {
              this.router.navigate(['/manage-donations']);
            } else {
              this.router.navigate(['/dashboard']);
            }
            localStorage.setItem('userInfo', JSON.stringify(data));
          }

        },
        error: error => {
          this.errorMessage = error.message;
        }
      })
    }


  }
  title = 'MediConnect';
  reloadPage(): void {
    window.location.reload();
  }
}


class UserDetails {
  regid = "";
  firstname = "";
  lastname = "";
  gender = "";
  dob = "";
  bloodgroup = "";
  email = "";
  address = "";
  city = "";
  state = "";
  zipcode = "";
  username = "";
  password = "";
  confirmpassword = "";
  createddate = "";
}
