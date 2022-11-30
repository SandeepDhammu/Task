import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthRoutes } from './auth.routing';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, AuthRoutes, DropdownModule, ReactiveFormsModule],
  declarations: [
    AuthComponent,
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
})
export class AuthModule {}
