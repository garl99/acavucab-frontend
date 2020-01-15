import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()

export class BeerService {
  public url;


  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  getTypes(): Observable<any> {

    let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'get-tipoc', { headers: headers })
  }

  getBeers(): Observable<any> {

    let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'get-cervezas', { headers: headers });

  }

  getBeer(id): Observable<any> {

    let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'beer/' + id, { headers: headers });

  }


  getdataBeer(): Observable<any> {
    let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'get-cervezas', { headers: headers })

  }

  getBeerSupplier(suppliers): Observable<any> {

    let json = JSON.stringify(suppliers);

    let params = 'json=' + json;

    let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url + 'get-beers-suppliers', params, { headers: headers });

  }

  getAvailable(id): Observable<any> {
    let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'get-cervezas-disponibles/'+id, { headers: headers })

  }




}
