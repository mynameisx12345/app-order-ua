import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserLogService {
  apiUrl = environment.apiUrl;
  currentUser$ = new BehaviorSubject<any>(null);
  logged = new BehaviorSubject(false);
  constructor(
    private http: HttpClient
  ) { }

  login(data:any){
    return this.http.post(`${this.apiUrl}/api/users/login`,data);
  }
}

export interface UserModel{
  id: number,
  email: string,

}
