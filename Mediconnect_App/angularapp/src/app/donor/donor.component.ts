import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent {
  errorMessage = "";
  showMsg: boolean = false;
  isSubmitted = false;

  meds: any[] = [];
  donorForm: FormGroup;
  organList: any[] = [];
  constructor(
    private http: HttpClient,
    private app: AppService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.donorForm = this.fb.group({
      organinfos: [''],
      medinfos: [''],
      name: ['', Validators.required],
      relationship: ['', Validators.required],
      contact: ['', Validators.compose([Validators.required, Validators.min(1000000000), Validators.max(9999999999)])],
      address: ['', Validators.required],
      sign: ['', Validators.required],
      donationConsent: ['', Validators.required],
    });
    this.http.get<any>('/organ').subscribe(res => {
      console.log(res)
      if(res?.status?.success) {
        this.organList = res.organList.map((e: any) => {
          return {
            ...e,
            checked: false
          }
        });
        this.meds = res.medInfo.map((e: any) => {
          return {
            ...e,
            checked: false
          }
        });
      }
    });
  }

  clearinput() {
    this.donorForm.reset();
    this.isSubmitted = false;
    this.organList.forEach(item => item.checked = false);
    this.meds.forEach(item => item.checked = false);
  }

  saveDonor() {
    this.isSubmitted = true;
    if (this.donorForm.valid
      && this.checkOrgansSelected()
    ) {
      const donData = this.donorForm.value as IDonorDetails;
      donData.contact = donData.contact.toString();
      donData.userid = this.app.getUserInfo()?.regid || 0
      const organsData = this.organList.filter((item, i) => this.organList[i].checked).map(data => data.id);
      if(organsData.includes(0)){
        organsData.pop();
      }
      donData.organs = {organsData};
      const medsData = this.meds.filter((item, i) => this.meds[i].checked).map(data => data.id);
      donData.medinfo = medsData;
      this.http.post<any>('/donor', donData).subscribe({
        next: data => {
          this.showMsg = true;
          localStorage.setItem('donorDetails', JSON.stringify(donData));
          this.router.navigateByUrl('donation-card');
          this.clearinput();
        },
        error: error => {
          this.errorMessage = error.message;
        }
      });

      window.scrollTo(0, 0);
    } else {
      this.donorForm.markAllAsTouched();
    }
  }

  title = 'MediConnect';
  checkMedsSelected() {
    return !!this.meds.find(r => r.checked);
  }
  checkOrgansSelected() {
    return !!this.organList.find(r => r.checked);
  }
  checkOtherOrgansSelectedButNoContent() {
    return !!this.organList[this.organList.length - 1].checked && this.donorForm.get('organinfos')?.value.length === 0;
  }
  checkOtherMedsSelectedButNoContent() {
    return !!this.meds[this.meds.length - 1].checked && this.donorForm.get('medinfos')?.value.length === 0;
  }
}
interface IDonorDetails {
  userid: number;
  donorid: string;
  organs: any;
  medinfo: number[];
  name: string;
  relationship: string;
  contact: string;
  address: string;
  sign: string;
  createddate: string;
}

