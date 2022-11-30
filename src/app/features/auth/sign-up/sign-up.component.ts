import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { CountryStatesService } from 'src/app/services/countryStates.service';
import { Country } from 'src/app/models/country.model';
import { User } from 'src/app/models/user.model';

let base64String;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  isShow1:boolean = false;
  isShow2:boolean = false;
  isMatch: boolean = true;
  countries: Country[] = [];
  states: String[] = [];
  selectedCountry?: Country;
  selectedState: any = '';

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    imgUrl: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    password: new FormControl('', Validators.required),
    cPassword: new FormControl('', Validators.required),
  });

  constructor(
    private countryStatesService: CountryStatesService,
    private userService: UsersService,
    private router: Router
  ) {
    this.fetchCountries();
  }

  fetchCountries() {
    this.countryStatesService.getCountries(null).subscribe((d: any) => {
      this.countries = d.items;
    });
  }

  fetchStates(country: Country) {
    this.selectedCountry = country;

    const param = {
      countryShortName: country.shortName,
    };
    this.countryStatesService.getStates(param).subscribe((d: any) => {
      this.states = d.items;
    });
  }

  submit() {
    if (this.form.valid) {
      let body: User = this.form.value;
      body.country = this.selectedCountry?.name;
      body.state = this.selectedState;
      this.userService.signUp(body).subscribe((res: any) => {
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
