import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()

export class MethodService {
    public url;


    constructor(public _http: HttpClient) {
        this.url = global.url;
    }

    getCards(id,rol,type): Observable<any> {             

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'get-metodoP/'+id+'/'+rol+'/'+type, { headers: headers });


    }

}
