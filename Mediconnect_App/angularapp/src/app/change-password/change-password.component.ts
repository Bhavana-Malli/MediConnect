import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  title = 'MediConnect';
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }
}
