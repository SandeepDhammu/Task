import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = environment.apiUrls.api + '/users';
  user?: any;
  token?: any;

  httpOptions = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.user = JSON.parse(localStorage.getItem('user') as any);
    this.token = JSON.parse(localStorage.getItem('x-access-token') as any);
    if (this.token) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': this.token,
        }),
      };
    } else {
      this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
    }
  }

  signUp(body: User): Observable<User> {
    return this.http
      .post<User>(
        this.apiUrl + '/signup',
        JSON.stringify(body),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler as any));
  }

  signIn(body: User): Observable<User> {
    return this.http
      .post<User>(
        this.apiUrl + '/signin',
        JSON.stringify(body),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler as any));
  }

  update(userId: String, body: User): Observable<User> {
    console.log(this.httpOptions);

    return this.http
      .put<User>(
        this.apiUrl + `/${userId}`,
        JSON.stringify(body),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler as any));
  }

  get(param: any): Observable<User[]> {
    return this.http
      .get<User[]>(this.apiUrl, { params: param })
      .pipe(catchError('' as any));
  }

  getById(userId: String, param: any): Observable<User[]> {
    return this.http
      .get<User[]>(this.apiUrl + `/${userId}`, { params: param })
      .pipe(catchError('' as any));
  }

  forgotPassword(body: User): Observable<User> {
    return this.http
      .post<User>(
        this.apiUrl + '/forgotPassword',
        JSON.stringify(body),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler as any));
  }

  resetPassword(userId: String, body: User): Observable<User> {
    return this.http
      .put<User>(
        this.apiUrl + `/resetPassword/${userId}`,
        JSON.stringify(body),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler as any));
  }

  updatePassword(userId: String, body: User): Observable<User> {
    return this.http
      .put<User>(
        this.apiUrl + `/updatePassword/${userId}`,
        JSON.stringify(body),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler as any));
  }

  delete(userId: String): Observable<User> {
    return this.http
      .delete<User>(this.apiUrl + `/${userId}`, this.httpOptions)
      .pipe(catchError(this.errorHandler as any));
  }

  logout() {
    localStorage.clear();
    this.user = null
    this.token = null
    this.router.navigate(['/auth/sign-in']);
  }

  errorHandler(error: any) {
    console.log(error);

    this.snackBar.open(error.message, 'close', {
      duration: 2000,
    });
    return;
  }
}
