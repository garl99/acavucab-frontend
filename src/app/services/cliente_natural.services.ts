import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cliente_natural} from '../models/cliente_natural';
import {Telefono} from '../models/telefono';
import {Correo_electronico} from '../models/correo_electronico';
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



    register(cliente_natural, telefono, correo, lugar): Observable<any>{

        var p = $.extend(cliente_natural, telefono, correo, lugar );
        let json = JSON.stringify(p);
        //let json2 = JSON.stringify(telefono);
        //let json3 = JSON.stringify(correo_electronico);
        let params =  'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        console.log(params);
        console.log(this.url+'register-natural');

        return this._http.post(this.url+'register-natural', params, {headers: headers});
    }
}