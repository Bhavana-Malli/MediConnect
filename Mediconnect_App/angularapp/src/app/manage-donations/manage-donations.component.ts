import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DonationDetails } from '../view-donors/view-donors.component';
import { RecipientDetails } from '../view-recipients/view-recipients.component';
import { forkJoin } from 'rxjs';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-donations',
  templateUrl: './manage-donations.component.html',
  styleUrls: ['./manage-donations.component.css']
})
export class ManageDonationsComponent {
  donations = {} as IDonaiton
  donationCount = 0;
  recipientCount = 0;
  mediOrder: any = {
    1: 1, 2: 2, 3: 3, 4: 4
  }

  constructor(private http: HttpClient, private router: Router) {

    forkJoin(
      {
        donorR: http.get<DonationDetails[]>('/donations?userId=' + 0),
        reciepientR: http.get<RecipientDetails[]>('/recipient?userId=' + 0),
      }
    ).subscribe(res => {
      this.donations = res;


      this.donations.donorR.forEach(item => {
        item.organs.forEach((e: any) => {
          if (!e.isDonated) {
            this.donationCount += 1;
          }
        });
        item.medInfos.forEach((x: any) => {
          item.order = this.mediOrder[x.id]
        })
        item.medicalInfo = item.medInfos.map((e: any) => e.name).join(',');
      })
      this.donations.donorR.sort((a, b) => {
        if (a.medInfos.length === 0 && b.medInfos.length > 0) {
          return -1;
        } else if (a.medInfos.length > 0 && b.medInfos.length === 0) {
          return 1;
        }

        // If both arrays are non-empty or both are empty, sort based on order property
        if (a.order < b.order) {
          return -1;
        } else if (a.order > b.order) {
          return 1;
        }

        // If order is the same, sort based on string value
        return a.medInfos.join("").localeCompare(b.medInfos.join(""));
      })
      console.log(this.donations.donorR)
      this.donations.reciepientR.forEach(item => {
        item.organsList.forEach((e: any) => {
          if (!e.isReceived) {
            this.recipientCount += 1;
          }
        })
      })
    });
  }

  approveOrReject(dondata: any, item: any, isApprove = false) {
    const payload = {
      organId: item.id,
      donation: isApprove,
      donorId: dondata.donorid,
      details: item.address ?? ''
    } as UpdateDonation;
    this.http.post('/donations/UpdateDonation', payload).subscribe(res => {
      if (res === 1) {
        item.isDonated = isApprove;
        console.log('approved');
      }
    }, err => {
      alert(err.message)
    })
  }
  approveOrRejectRecipient(recdata: any, item: any, isApprove = false) {
    const payload = {
      organId: item.id,
      IsReceived: isApprove,
      recipientId: recdata.recipientid,
      details: item.address ?? ''
    } as UpdateRecipient;
    this.http.post('/recipient/UpdateRecipient', payload).subscribe(res => {
      if (res === 1) {
        item.isReceived = isApprove;
        console.log('approved');
      }
    }, err => {
      alert(err.message)
    })
  }

  onLogOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
interface IDonaiton {
  donorR: any[];
  reciepientR: any[];
}

interface UpdateDonation {
  organId: number;
  donorId: number;
  donation: boolean;
  details: string;
}

interface UpdateRecipient {
  organId: number;
  recipientId: number;
  IsReceived: boolean;
  details: string;
}


