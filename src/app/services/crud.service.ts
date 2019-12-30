import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { global } from './global';

@Injectable()

export class CRUDService {
    public url: string;
    public token: string;
    public identity: string;


    constructor(public _http: HttpClient) {
        this.url = global.url;
    }


    registerJuridico(items): Observable<any>{

        let json = JSON.stringify(items);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'register-juridico', params, { headers: headers });

    }

    registerNatural(items): Observable<any>{

        let json = JSON.stringify(items);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'register-natural', params, { headers: headers });
    }

    registerProveedor(items): Observable<any>{
        let json = JSON.stringify(items);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'register-proveedor', params, { headers: headers });

    }

    registerCerveza(items,token): Observable<any>{
        let json = JSON.stringify(items);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url + 'register-cerveza', params, { headers: headers });

    }

    registerEvent(data_event, token): Observable<any>{

        let json = JSON.stringify(data_event);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
        return this._http.post(this.url + 'register-event', params, { headers: headers });

    }

    getdelete1(id): Observable<any>{
        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.delete(this.url+'delete-natural/'+id,{headers:headers});

    }

    getdelete2(id): Observable<any>{
        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.delete(this.url+'delete-juridico/'+id,{headers:headers});

    }

    getdelete3(id): Observable<any>{
        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.delete(this.url+'delete-proveedor/'+id,{headers:headers});

    }

    getdelete4(id,token): Observable<any>{
        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);;

        return this._http.delete(this.url+'delete-cerveza/'+id,{headers:headers});

    }

    updateBeer(id,token,dataBeer): Observable<any>{

        let json = JSON.stringify(dataBeer);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);;

        return this._http.post(this.url + 'update-cerveza/'+id, params, { headers: headers });

    }


} 