import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donor-card',
  templateUrl: './donor-card.component.html',
  styleUrls: ['./donor-card.component.css']
})
export class DonorCardComponent {
  donorDetails: any;
  constructor(private readonly router: Router) {
    const donorDetails = localStorage.getItem('donorDetails');
    if (donorDetails) {
      this.donorDetails = JSON.parse(donorDetails);
    } else {
      this.router.navigate(['dashboard']);
    }
  }
}
