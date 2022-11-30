import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country.model';
import { User } from 'src/app/models/user.model';
import { CountryStatesService } from 'src/app/services/countryStates.service';
import { PublicService } from 'src/app/services/public.service';
import { UsersService } from 'src/app/services/users.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

let base64String:any
@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss'],
})
export class EditUserProfileComponent implements OnInit {
  user: any;
  selectedFile?: ImageSnippet;
  isMatch: boolean = true;
  countries: Country[] = [];
  states: String[] = [];
  selectedCountry?: Country;
  selectedState: any = '';
src:any;
imgUrl:any
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    imgUrl: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
  });

  constructor(
    private countryStatesService: CountryStatesService,
    private userService: UsersService,
    private publicService: PublicService,
    private router: Router,
    public dialogRef: MatDialogRef<EditUserProfileComponent>
  ) {
    this.user = JSON.parse(localStorage.getItem('user') as any);
    this.form.get('firstName')?.setValue(this.user.firstName);
    this.form.get('lastName')?.setValue(this.user.lastName);
    this.form.get('email')?.setValue(this.user.email);
    this.form.get('imgUrl')?.setValue(this.user.firstName);
    this.form.get('mobile')?.setValue(this.user.mobile);
    this.form.get('country')?.setValue(this.user.country);
    this.form.get('state')?.setValue(this.user.state);
    this.fetchCountries();
  }

  fetchCountries() {
    this.countryStatesService.getCountries(null).subscribe((d: any) => {
      this.countries = d.items;
    });
  }

  fetchStates(country: Country) {
    this.selectedCountry = country;
    console.log(country);

    const param = {
      countryShortName: country.shortName,
    };
    this.countryStatesService.getStates(param).subscribe((d: any) => {
      this.states = d.items;
      console.log(this.states);
    });
  }

  submit() {
    if (this.form.valid) {
      let body: User = this.form.value;
      body.country = this.selectedCountry?.name || this.user.country;
      body.state = this.selectedState || this.user.state;
      body.imgUrl = base64String
      this.userService
        .update(this.user._id as any, body)
        .subscribe((res: any) => {
          if (res.isSuccess) {
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(res.data));
            this.dialogRef.close(true);
          } else {
            this.userService.errorHandler(res)
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
  uploadImg(event: any) {

    const file: File = event.files[0];
    const reader:FileReader = new FileReader();

    reader.onload = function () {
        base64String = reader.result
    }
    reader.readAsDataURL(file);
  }

  ngOnInit() {}
}
