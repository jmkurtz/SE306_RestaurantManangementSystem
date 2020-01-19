import { Injectable } from '@angular/core';
import { UserDto } from './Models/userDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../src/environments/environment'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const userAPI: string = environment.apiURL + '/users'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  newUser: UserDto = {
    id: null,
    firstName: null,
    lastName: null,
    emailAddress: null,
    passWord: null,
    isAdmin: false,
    priorityStatus: 0
  };
  loginRequest: UserDto = {
    id: null,
    firstName: null,
    lastName: null,
    emailAddress: null,
    passWord: null,
    isAdmin: false,
    priorityStatus: 0
  };

  constructor(private router: Router, private http: HttpClient) { }

  saveOrUpdateOrder() {
    console.log(this.newUser);
    return this.http.post<UserDto>(userAPI + '/register', this.newUser);
  }

  sendUserLoginRequest(): Observable<UserDto>{
    return this.http.post<UserDto>(userAPI + '/authenticate', this.loginRequest);
  }

  getUserList() : Observable<UserDto[]> {
    return this.http.get<UserDto[]>(userAPI, options);
  }

  getUserByID(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(environment.apiURL + '/users/'+ id, options);
  }

  deleteUser(id:number) {
    return this.http.delete(environment.apiURL + '/users/'+ id).toPromise();
  }
}
