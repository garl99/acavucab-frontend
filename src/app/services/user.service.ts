import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { global } from './global';

@Injectable()

export class UserService{

    public url: string;
    public token: string;
    public identity: string;

    constructor(public _http: HttpClient) {
        this.url = global.url;
    } 

    getAllUsers(): Observable<any>{

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'get-users',{headers:headers})
    }
}