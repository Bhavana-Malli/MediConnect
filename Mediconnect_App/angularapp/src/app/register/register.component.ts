import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Registration } from '../midconnect.model';
import { RegisterService } from '../midconnect.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage = "";
  showMsg: boolean = false;
  registrationForm: FormGroup;
  passwordMatchError = false;
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      bloodgroup: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    })
  }
  clearinput() {
    this.registrationForm.reset();
  }
  saveUser() {
    if (this.registrationForm.valid) {
      if (this.registrationForm.get('password')?.value === this.registrationForm.get('confirmpassword')?.value) {
        this.passwordMatchError = false;
        const regData = this.registrationForm.value as IRegisterDetails;
        this.http.post<any>('/home', regData).subscribe({
          next: data => {
            this.showMsg = true;
          },
          error: error => {
            this.errorMessage = error.message;
          }
        })
        this.clearinput();
        window.scrollTo(0, 0);
      } else {
        this.passwordMatchError = true;
      }
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  title = 'MediConnect';
}
interface IRegisterDetails {
  regid: string;
  firstname: string;
  lastname: string;
  gender: string;
  dob: string;
  bloodgroup: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  password: string;
  confirmpassword: string;
}
