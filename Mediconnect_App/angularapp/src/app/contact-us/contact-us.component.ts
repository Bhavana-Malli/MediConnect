import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactUsForm: FormGroup;
  isSubmitted = false;

  contacts = [
    {
      name: 'Bhavana Malli',
      phone: '+1 660-528-5198',
      mail: 'bhavana@gmail.com'
    },
    {
      name: 'Kyathi Jagadeeswar Pagadala',
      phone: '+1 469-881-9548',
      mail: 'kyathi@gmail.com'
    },
    {
      name: 'Nagadesi Danica Thanmai Charita',
      phone: '+1 660-528-1268',
      mail: 'Charita@gmail.com'
    },
    {
      name: 'Narayana Potla',
      phone: '+1 315-225-3604',
      mail: 'narayana@gmail.com'
    },
    {
      name: 'Tejo Lakshmi Tata',
      phone: '+1 660-528-5081',
      mail: 'tejo@gmail.com'
    },
    {
      name: 'Yagna Venkata Teja Kanukonala',
      phone: '+1 660-528-8746',
      mail: 'teja@gmail.com'
    },
  ]
  successMessage = '';
  errorMessage = '';
  constructor(
    private readonly fb: FormBuilder,
    private readonly app: AppService,
    private readonly http: HttpClient
  ) {
    this.contactUsForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    })
  }
  onContactUs() {
    this.isSubmitted = true;
    if (this.contactUsForm.valid) {
      const user = this.app.getUserInfo();
      let userId = 0;
      if (user) {
        userId = user.regid;
      }
      const payload = {
        Name: this.contactUsForm.get('name')?.value,
        Email: this.contactUsForm.get('email')?.value,
        Message: this.contactUsForm.get('message')?.value,
        UserId: userId
      }
      this.http.post<any>('/contact', payload).subscribe({
        next: data => {
          if (data.success) {
            this.successMessage = 'Your feedback is sumbitted.';
            this.errorMessage = '';
          }
        },
        error: error => {
          this.errorMessage = error.message;
        }
      })
    } else {
      this.errorMessage = 'Please select rating and provide descriptive feedback.';
    }


  }
}
