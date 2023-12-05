import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent {
  hospitals: any;

  constructor(
    private http: HttpClient,
    protected _sanitizer: DomSanitizer
  ){
    this.getHospitals();
  }
  getHospitals(){
    this.http.get<any[]>('/hospital').subscribe(res => {
      if (res && res.length > 0) {
        console.log(res)
        this.hospitals = res;
      }
    });
  }

  sanitize(url: string){
return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
