import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { Diary } from 'src/app/models/Diary';

import { BeerService} from '../../services/beer.service';
import { CRUDService } from 'src/app/services/crud.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from "@angular/router"


@Component({
  selector: 'app-products',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  providers: [AuthService, BeerService, StoreService, NotificationsService, CRUDService]

})
export class OffersComponent implements OnInit {

  public identity;
  public token;
  public beers;
  p: number = 1;

  constructor(private _authService: AuthService, private _beerService:BeerService, private _crudService: CRUDService, private _service: NotificationsService, private router: Router) { }

  ngOnInit() {
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();
    this.loadBeers();
  }

  sendOffers() {
    /*
    let tipo = $("#credit").is(':checked') == true ? 'credito' : 'debito';
    let NumTarjeta = $("#NumTarjeta").val();
    let nombreTarjeta = $('#nombreTarjeta').val();
    let mes = $('#mes').val();
    let año = $('#año').val();
    let cvv = $('#cvv').val();
    */

    //Se construyen los datos para el objeto Diary.
    let hoy = new Date();
    let fecha_emision = hoy.getFullYear()+'-'+(hoy.getMonth()+1)+'-'+hoy.getDate();  
    console.log(this.identity)
    let fk_empleado = this.identity.id;


    //if(tipo && NumTarjeta && nombreTarjeta && mes && año && cvv){
    if(fk_empleado){
      let data_offers = [new Diary(fecha_emision, fk_empleado)];
    

      this._crudService.postOffers(data_offers, this.token).subscribe(
          
        response => {
          console.log(response);
          /*
          $("#eventModal").modal('hide');
          this.suppliersIn = [];
          this.beersIn = [];
          $('#CreateEventForm').trigger("reset");
          */
          this.notificationSucess();
          //this.updateDatable();
          
          //this.redirect();
          
        },
        error => {
          console.log('Ocurrió un error ', <any>error);

          /*
          console.log(<any>error);
          $("#eventModal").modal('hide');
          */
          this.notificationError();
        }
      );
    }
  }

  loadBeers() {
    this._beerService.getBeers().subscribe(
      response => {
        this.beers=response.beers;
        console.log(this.beers);
        
      },
      error=>{
        console.log(<any>error);
      }

    );
  }

  /*Función para esperar una cierta cantidad de tiempo*/
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  /*Esta función redirecciona a cierta página luego de esperar de forma asíncrona una cantidad de tiempo*/
  async redirect() {
    //Espera por el timeOut
    await this.sleep(5000);
    //Redirecciona
    this.router.navigate(['/dashboard']);
  }

  notificationSucess() {
    this._service.success('Ofertas guardadas', 'Gracias por su tiempo', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  notificationError() {
    this._service.error('Error', 'No fue posible realizar esta operación. Intente más tarde.', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

}
