import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()

export class StoreService {
    public url;


    constructor(public _http: HttpClient) {
        this.url = global.url;
    }

    findClient(ci): Observable<any> {             //Comprar ahora solo una cerveza

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'get-clienten/' + ci, { headers: headers });


    }
    findClient2(rif): Observable<any> {             //Comprar ahora solo una cerveza

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'get-clientej/' + rif, { headers: headers });


    }

    findPayment(id): Observable<any> {             //Busca si ya pago el proveedor su cuota

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'get-pago_cuota/'+id, { headers: headers });
    }


    CheckStock(id): Observable<any> {             //Cervezas a regenrar

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'check-inventario2/' + id, { headers: headers });


    }


}
