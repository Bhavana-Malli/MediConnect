import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DonorComponent } from './donor/donor.component';
import { RecipientComponent } from './recipient/recipient.component';
import { RegisterComponent } from './register/register.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DonationsComponent } from './donations/donations.component';
import { ViewRecipientsComponent } from './view-recipients/view-recipients.component';
import { ViewDonorsComponent } from './view-donors/view-donors.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AwarenessComponent } from './awareness/awareness.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DonorCardComponent } from './donor-card/donor-card.component';
import { ManageDonationsComponent } from './manage-donations/manage-donations.component';

// Create a routes Array
const routes: Routes = [
  {
      path: '',
    component: LoginComponent,

  },
  { path: 'login',   redirectTo: '', pathMatch: 'full' }, // redirect to `first-component`


  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: 'change',
    component: ChangePasswordComponent
  },
  {
    path: 'donor',
    component: DonorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recipient',
    component: RecipientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  // {
  //   path: 'donation',
  //   component: DonationsComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'hospital',
    component: HospitalsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-recipients',
    component: ViewRecipientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-donors',
    component: ViewDonorsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'awareness',
    component: AwarenessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'donation-card',
    component: DonorCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-donations',
    component: ManageDonationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  { path: '**',   redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
