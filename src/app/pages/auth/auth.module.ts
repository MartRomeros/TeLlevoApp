import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthPageRoutingModule } from './auth-routing.module';
import { AuthPage } from './auth.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';



@NgModule({
  declarations: [AuthPage, LoginComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [AuthPage, ForgotPasswordComponent, LoginComponent ],
  providers: [AuthServiceService]
})
export class AuthPageModule { }
