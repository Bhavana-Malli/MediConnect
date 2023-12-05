import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DonationsComponent } from './donations/donations.component';
import { DonorComponent } from './donor/donor.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { RecipientComponent } from './recipient/recipient.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { DialogContentDialog, ViewDonorsComponent } from './view-donors/view-donors.component';
import { ViewRecipientsComponent } from './view-recipients/view-recipients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AwarenessComponent } from './awareness/awareness.component';
import { AuthGuard } from './guards/auth.guard';
import { FeedbackComponent } from './feedback/feedback.component';
import { AppService } from './services/app.service';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DonorCardComponent } from './donor-card/donor-card.component';
import { FooterComponent } from './Footer/footer.component';
import { ManageDonationsComponent } from './manage-donations/manage-donations.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ChangePasswordComponent,
    DonationsComponent,
    DonorComponent,
    ForgotComponent,
    HospitalsComponent,
    RecipientComponent,
    RegisterComponent,
    ViewDonorsComponent,
    ViewRecipientsComponent,
    AwarenessComponent,
    FeedbackComponent,
    ContactUsComponent,
    AboutUsComponent,
    DonorCardComponent,
    FooterComponent,
    ManageDonationsComponent,
    DialogContentDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [AuthGuard, AppService],
  bootstrap: [AppComponent,LoginComponent],
})
export class AppModule { }
