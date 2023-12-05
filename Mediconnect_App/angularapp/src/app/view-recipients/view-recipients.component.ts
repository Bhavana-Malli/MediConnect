import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppService } from '../services/app.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentDialog } from '../view-donors/view-donors.component';

@Component({
  selector: 'app-view-recipients',
  templateUrl: './view-recipients.component.html',
  styleUrls: ['./view-recipients.component.css']
})
export class ViewRecipientsComponent {
  public recdetails?: RecipientDetails[];

  constructor(http: HttpClient, app: AppService, private dialog: MatDialog) {
    const userId = app.getUserInfo()?.regid || 0

    http.get<RecipientDetails[]>('/recipient?userId='+ userId).subscribe(result => {
      this.recdetails = result;
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

export interface RecipientDetails {
  recipientid: string;
  organsinfo: string;
  organsList: any[];
  bloodtype: string;
  age: string;
  details: string;
  name: string;
  relationship: string;
  contact: string;
  address: string;
  createddate: string;
}
