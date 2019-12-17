import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Telefono} from '../models/telefono';
import {global} from './global';

@Injectable()
export class TelefonoService{
    public url: string;


    constructor(
        public _http: HttpClient
    ){
        this.url= global.url;
    }



    register(telefono): Observable<any>{
        let json = JSON.stringify(telefono);
        let params =  'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'register-natural', params, {headers: headers});
    }
}