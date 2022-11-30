import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  isShow:boolean = false
  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.userService.signIn(this.form.value).subscribe((res: any) => {
        if (res.isSuccess && res.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem(
            'x-access-token',
            JSON.stringify(res.data.accessToken)
          );
          this.userService.user = res.data
          this.userService.token = res.data.token
          this.router.navigate(['/main']);
        } else {
          this.userService.errorHandler(res)
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
