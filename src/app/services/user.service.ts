import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../model/register';

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

  registerUser(userInfo: Register): Observable<Register> {
    return this.http.post<Register>(this.url, userInfo);
  }

  loginUser(loginInfo: any): Observable<any> {
    return this.http.get(`${this.url}?email=${loginInfo.email}`)
  }

  getAdminData(): Observable<any> {
    return this.http.get(`${this.url}?role=${this.role.admin}`)
  }

  getUserData(): Observable<any> {
    return this.http.get(`${this.url}?role=${this.role.user}`)
  }
}
