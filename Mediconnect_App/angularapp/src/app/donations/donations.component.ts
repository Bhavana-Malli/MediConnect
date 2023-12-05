import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent {
  public dondetails?: DonationDetails[];

  constructor(http: HttpClient) {
    http.get<DonationDetails[]>('donations').subscribe(result => {
      this.dondetails = result;
    }, error => console.error(error));
  }

  title = 'angularapp';
}
interface DonationDetails {
  donorid: string;
  organs: string;
  medinfo: string;
  name: string;
  relationship: string;
  contact: string;
  address: string;
  sign: string;
  createddate: string;
}

