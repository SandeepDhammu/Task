import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  user: any;
  constructor(private userService: UsersService, private dialog: MatDialog) {

  }
  ngOnInit() {
    this.user = this.userService.user;
  }

  editProfile() {
    this.dialog
      .open(EditUserProfileComponent, {
        panelClass: 'p-relative',
        minWidth: '30%',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.user = JSON.parse(localStorage.getItem('user') as any);
        }
      });
  }

  changePassword() {
    this.dialog
      .open(ChangeUserPasswordComponent, {
        panelClass: 'p-relative',
        minWidth: '20%',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.user = JSON.parse(localStorage.getItem('user') as any);
        }
      });
  }

  logout(){
    this.userService.logout()
  }
}
