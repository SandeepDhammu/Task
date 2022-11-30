import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  userId:any

  form: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    cPassword: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UsersService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.userId = this.activatedRoute.snapshot.params['id']
    console.log(this.userId);
  }


  submit() {
    if (this.form.valid) {
      this.userService.resetPassword(this.userId,this.form.value).subscribe((res: any) => {
        if (res.isSuccess) {
          this.router.navigate(['/auth/sign-in']);
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
