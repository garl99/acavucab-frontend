import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()

export class ReportService {
    public url;


    constructor(public _http: HttpClient) {
        this.url = global.url;
    }

    reportA(data): Observable<any> {             //Comprar ahora solo una cerveza

        let json = JSON.stringify(data);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'asistence-report', params, { headers: headers });


    }

    reportB(data): Observable<any> {             //Comprar ahora solo una cerveza

        let json = JSON.stringify(data);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'reporteB-report', params, { headers: headers });


    }



}
