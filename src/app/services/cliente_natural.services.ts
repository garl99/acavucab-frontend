import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cliente_natural} from '../models/cliente_natural';
import {Telefono} from '../models/telefono';
import {Correo} from '../models/correo';
import {global} from './global';

@Injectable()
export class ClienteNaturalService{
    public url: string;
    public identity;
    public token;

    constructor(
        public _http: HttpClient
    ){
        this.url= global.url;
    }



    register(cliente_natural,telefono, correo ): Observable<any>{
        let json = JSON.stringify(cliente_natural);
        let json2 = JSON.stringify(telefono);
        let json3 = JSON.stringify(correo);
        let params =  'json='+json+json2+json3;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'register-natural', params, {headers: headers});
    }
}