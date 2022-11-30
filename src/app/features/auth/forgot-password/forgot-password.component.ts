import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UsersService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.userService.forgotPassword(this.form.value).subscribe((res: any) => {
        if (res.isSuccess) {
          this.matSnackBar.open('Forgot Password Mail sent to mailTrap.io!');
          this.router.navigate(['../']);
        } else {
          this.userService.errorHandler(res);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
