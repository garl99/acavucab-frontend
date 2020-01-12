import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()

export class AsistenceService {
    public url: string;


    constructor(public _http: HttpClient) {
        this.url = global.url;
    } 

    getTxt(): Observable<any>{

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'get-txt',{headers:headers})
    }

} 