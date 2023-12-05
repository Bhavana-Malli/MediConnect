import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
  constructor(){ }
  getUserInfo(){
    const userInfo = localStorage.getItem('userInfo');
    if(userInfo) {
      const user = JSON.parse(userInfo);
      return user;
    }
    return null;
  }
}
