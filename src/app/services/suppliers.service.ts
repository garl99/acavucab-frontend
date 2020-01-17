import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()

export class SuppliersService {
    public url;


    constructor(public _http: HttpClient) {
        this.url = global.url;
    }

    orders(): Observable<any> {             //Ordenes de compras

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'orders-to-buy', { headers: headers });


    }


    changeStatus(data): Observable<any> { //Cambiar el status
        
        let json = JSON.stringify(data);

        console.log(json);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'change-s-t', params, { headers: headers });
    }

}
