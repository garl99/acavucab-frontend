import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { global } from './global';

@Injectable()

export class AuthService {
  public url: string;
  public token:string;
  public identity:string;
  

  constructor(public _http: HttpClient) { 
    this.url=global.url;
  }

  signup(auth, getToken=null): Observable<any>{

    if(getToken!=null){
      auth.getToken='true';
   }


   let json=JSON.stringify(auth);

   let params= 'json='+json;

   let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

   return this._http.post(this.url+'login',params,{headers:headers});

  }

  getIdentity(){

    let identity=JSON.parse(localStorage.getItem('identity'));

    if(identity && identity!='undefined'){
        this.identity=identity;
    }
    else{
        this.identity=null;
    }

    return this.identity;

}

getToken(){

    let token=localStorage.getItem('token');

    if(token && token!='undefined'){
        this.token=token;
    }
    else{
        this.token=null;
    }

    return this.token;

}


}
