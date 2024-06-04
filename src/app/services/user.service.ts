import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  role: { user: string, admin: string } = {
    user: 'user',
    admin: 'admin'
  }

  url: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  registerUser(userInfo: any): Observable<any> {
    return this.http.post(this.url, userInfo);
  }

  loginUser(loginInfo: any): Observable<any> {
    return this.http.get(`${this.url}?email=${loginInfo.email}`)
  }

  getAdminData(): Observable<any> {
    return this.http.get(`${this.url}?role=${this.role.admin}`)
  }
}
