import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AppService } from '../services/app.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-view-donors',
  templateUrl: './view-donors.component.html',
  styleUrls: ['./view-donors.component.css']
})
export class ViewDonorsComponent {
  public dondetails?: DonationDetails[];

  constructor(http: HttpClient, app: AppService, public dialog: MatDialog) {

    const userId = app.getUserInfo()?.regid || 0
    http.get<DonationDetails[]>('/donations?userId='+ userId).subscribe(result => {
      this.dondetails = result;
      this.dondetails.forEach(item => {
          item.medinfo = item.medInfos.map(e => e.name).join(',')
      });
    }, error => console.error(error));
  }

  title = 'angularapp';
  getDetails = (data: string) => {
    const dialogRef = this.dialog.open(DialogContentDialog, {
      minWidth: '320px',
      minHeight: '300px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
export interface DonationDetails {
  donorid: string;
  organs: any;
  medinfo: string;
  medInfos: any[];
  name: string;
  relationship: string;
  contact: string;
  address: string;
  sign: string;
  createddate: string;
  details: string;
}

@Component({
  selector: 'dialog-content-dialog',
  template: `
  <div class="d-flex flex-column justify-content-center p-4 mt-4 align-items-center h-100">
  <h4>Head to following hospital for donation</h4>
  <p class="text-info">{{data.length > 0 ? data : 'Not yet answered by medical professionals'}}</p>
  </div>
  `,
})
export class DialogContentDialog {
constructor(
  @Inject(MAT_DIALOG_DATA) public data: any
){

}
}
