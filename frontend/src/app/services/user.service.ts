import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  SERVER_URL="http://localhost:3000/api";
  auth = false;
  private user:any;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) {}
  loginUser(email:string,password:string){
      this.httpClient.get<any>(this.SERVER_URL+'/utenti/log/',{
        params: {
          username: email,
          password: password
        }
      })
      .subscribe((resp)=>{
        console.log(resp)
        if(resp.message!='Account non trovato')
        this.auth=true;
        this.authState$.next(this.auth);
        this.userData$.next({email,password});
      });
  }
  logout(){
    this.auth=false;
    this.authState$.next(this.auth);
  }
}
