import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      {path: 'sign-in', component:SignInComponent},
      {path: 'sign-up', component:SignUpComponent},
      {path: 'forgot-password', component:ForgotPasswordComponent},
      {path: 'reset-password/:id', component:ResetPasswordComponent}
    ],
  },
];

export const AuthRoutes = RouterModule.forChild(routes);
