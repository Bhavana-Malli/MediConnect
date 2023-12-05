import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  starValue = 0;
  description = '';
  errorMessage = '';
  successMessage = '';
  constructor(
    private readonly http: HttpClient,
    private readonly app: AppService
  ) {
  }
  onStarClick(value: number) {
    this.starValue = value;
  }
  onSubmit() {
    if (this.starValue > 0 && this.description.trim().length > 0) {
      this.errorMessage = '';
      const user = this.app.getUserInfo();
      let userId = 0;
      if (user) {
        userId = user.regid;
      }
      const payload = {
        Rating: this.starValue,
        Feedback: this.description,
        UserId: userId
      }
      this.http.post<any>('/feedback', payload).subscribe({
        next: data => {
          if (data.success) {
            this.successMessage = 'Your feedback is sumbitted.';
            this.errorMessage = '';
            this.starValue = 0;
            this.description = '';
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
