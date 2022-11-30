import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutes } from './main.routing';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutes,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MainComponent,EditUserProfileComponent, ChangeUserPasswordComponent]
})
export class MainModule { }
