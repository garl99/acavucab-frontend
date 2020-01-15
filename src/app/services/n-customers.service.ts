import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { global } from './global';

@Injectable()

export class CustomersNService {
    public url: string;
    public token: string;
    public identity: string;


    constructor(public _http: HttpClient) {
        this.url = global.url;
    }

    getCustomern(): Observable<any>{

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'get-natural',{headers:headers})
    }

    getCustomerj(): Observable<any>{

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'get-juridico',{headers:headers})
    }

    getSuppliers(): Observable<any>{

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'get-proveedor',{headers:headers})
    }

    getPlaces(place): Observable<any>{

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'places/'+place,{headers:headers})
    }
    
    getUsers(): Observable<any>{

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'get-users',{headers:headers})
    }

    getRoles(): Observable<any>{

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'get-roles',{headers:headers})
    }
} 