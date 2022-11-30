import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryStatesService {
  private apiUrl = environment.apiUrls.api + '/public';

  constructor(private http: HttpClient) {}

  getCountries(param: any | null): Observable<Country[]> {
    return this.http
      .get<Country[]>(this.apiUrl + '/countires', { params: param })
      .pipe(catchError(this.errorHandler as any));
  }

  getStates(param: any | null): Observable<Country[]> {
    return this.http
      .get<Country[]>(this.apiUrl + '/states', { params: param })
      .pipe(catchError(this.errorHandler as any));
  }

  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return console.log(errorMessage);
  }
}
