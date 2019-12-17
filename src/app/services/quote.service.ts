import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()

export class QuoteService {
    public url;


    constructor(public _http: HttpClient) {
        this.url = global.url;
    }

    doQuote(items): Observable<any> {

        let json = JSON.stringify(items);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'register-quote', params, { headers: headers });


    }

}
