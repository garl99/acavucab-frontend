import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()

export class CartService {
    public url;


    constructor(public _http: HttpClient) {
        this.url = global.url;
    }

    getCart(data): Observable<any> {

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'get-carrito/'+data.id+'/'+data.rol, { headers: headers });

    }

    
    addCart(data): Observable<any> {
        
        let json = JSON.stringify(data);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'add-carrito', params, { headers: headers });

    }

}