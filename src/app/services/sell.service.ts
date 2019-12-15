import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()

export class SellService {
    public url;


    constructor(public _http: HttpClient) {
        this.url = global.url;
    }

    doSell(data): Observable<any> {             //Comprar ahora solo una cerveza

        let json = JSON.stringify(data);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'register-venta', params, { headers: headers });


    }


    doSell2(data): Observable<any> {             //Compra masiva de productos

        let json = JSON.stringify(data);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'register-venta', params, { headers: headers });

    }

}
