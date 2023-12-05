import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent {
  errorMessage = "";
  showMsg: boolean = false;
  recipientForm: FormGroup;
  isSubmitted = false;
  organs: any[] = [];
  timeout: any;
  constructor(private http: HttpClient, private fb: FormBuilder, private app: AppService) {
    this.http.get<any>('/organ').subscribe(res => {
      if(res?.status?.success) {
        this.organs = res.organList.map((e: any) => {
          return {
            ...e,
            checked: false
          }
        });
        console.log(this.organs)
      }
    });
    this.recipientForm = this.fb.group({
      bloodtype: ['', Validators.required],
      age: ['', Validators.required],
      name: ['', Validators.required],
      relationship: ['', Validators.required],
      contact: ['', Validators.compose([Validators.required, Validators.min(1000000000), Validators.max(9999999999)])],
      address: ['', Validators.required],
    });
  }
  clearinput() {
    this.recipientForm.reset();
    this.isSubmitted = false;
  }
  saveRecipient() {
    this.isSubmitted = true;
    if (this.recipientForm.valid) {
      const recipient = JSON.parse(JSON.stringify(this.recipientForm.value as IRecipientDetails));
      recipient.contact = recipient.contact.toString();
      delete recipient.selectedOrgans;
      const organs = this.organs.filter((item, i) => item.checked).map(data => data.id)
      recipient.organsinfo = organs;
      recipient.userid = Number(this.app.getUserInfo()?.regid || 0)
      this.http.post<any>('/recipient/PostRecDetails', recipient).subscribe({
        next: data => {
          if (data && data.success) {
            this.showMsg = true;
            this.errorMessage = '';
            this.timeout = setTimeout(() => this.showMsg = false, 2000);

          }
        },
        error: error => {
          this.errorMessage = error.message;
        }
      })
      this.clearinput();
      window.scrollTo(0, 0);
    } else {
      this.recipientForm.markAllAsTouched();
    }
  }

  title = 'MediConnect';
  ngOnDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
interface IRecipientDetails {
  recipientid: string;
  organsinfo: number[];
  bloodtype: string;
  age: string;
  name: string;
  relationship: string;
  contact: string;
  address: string;
  createddate: string;
}

