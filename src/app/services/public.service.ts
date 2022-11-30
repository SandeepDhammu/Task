import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private apiUrl = environment.apiUrls.api + '/public';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  imageUpload(image: any): Observable<any> {
    const formData = new FormData();
    formData.append('media', image);
    return this.http
      .post<any>(
        this.apiUrl + '/upload',
        formData,
      ).pipe();
  };

}
