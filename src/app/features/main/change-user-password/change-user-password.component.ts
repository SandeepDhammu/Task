import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-user-password',
  templateUrl: './change-user-password.component.html',
  styleUrls: ['./change-user-password.component.scss'],
})
export class ChangeUserPasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    cPassword: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UsersService,
    private router: Router,
    public dialogRef: MatDialogRef<ChangeUserPasswordComponent>
  ) {}

  submit() {
    if (this.form.valid) {
      this.userService
        .updatePassword(this.userService.user?._id as any, this.form.value)
        .subscribe((res: any) => {
          if (res.isSuccess) {
            this.dialogRef.close(true);
          } else {
            this.userService.errorHandler(res)
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnInit() {}
}
