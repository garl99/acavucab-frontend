import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()

export class EventService {
    public url: string;
    public token: string;
    public identity: string;


    constructor(public _http: HttpClient) {
        this.url = global.url;
    } 

    getAllEvents(): Observable<any>{

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'get-events',{headers:headers})
    }
    

    sellTicket(data_ticket): Observable<any>{

        let json = JSON.stringify(data_ticket);

        let params = 'json=' + json;

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'sell-ticket',params,{headers:headers})
    }

    getAllBeersEvents(id): Observable<any>{

        let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'get-beers-event/'+id,{headers:headers})
    }

} 