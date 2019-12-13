import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Correo} from '../models/correo';
import {global} from './global';

@Injectable()
export class CorreoService{
    public url: string;


    constructor(
        public _http: HttpClient
    ){
        this.url= global.url;
    }



    register(correo): Observable<any>{
        let json = JSON.stringify(correo);
        let params =  'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'register-natural', params, {headers: headers});
    }
}