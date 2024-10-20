import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthPageRoutingModule } from './auth-routing.module';
import { AuthPage } from './auth.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HeaderComponent } from "../pasajero/components/header/header.component";
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';



@NgModule({
  declarations: [AuthPage, LoginComponent, RegistroComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HeaderComponent,
],
  exports: [AuthPage, RegistroComponent, ForgotPasswordComponent, LoginComponent],
  providers:[AuthServiceService]
})
export class AuthPageModule { }
