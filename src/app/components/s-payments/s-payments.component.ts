import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BeerService } from 'src/app/services/beer.service';
import { StoreService } from 'src/app/services/store.service';
import { NotificationsService } from 'angular2-notifications';
import { MethodService } from 'src/app/services/method.service';
import { error } from 'protractor';
import { Payment } from 'src/app/models/Payment';
import { SellService } from 'src/app/services/sell.service';
import { CRUDService } from 'src/app/services/crud.service';
import { Router } from "@angular/router"

declare var $;

@Component({
  selector: 'app-s-payments',
  templateUrl: './s-payments.component.html',
  styleUrls: ['./s-payments.component.css'],
  providers: [AuthService, BeerService, StoreService, NotificationsService, MethodService, SellService, CRUDService]

})
export class SPaymentsComponent implements OnInit {

  p: number = 1;
  public identity;
  public token;
  public beersAvailable;
  public beerSelected: any;
  public beersIn = Array();
  public beersInO: any[];
  public flagCn;
  public flagCj;
  public flagCredit;
  public flagDebit;
  public flagCash;
  public flagCash2;
  public total;
  public cn;
  public cj;
  public credit_cards;
  public debit_cards;
  public pagado;
  public methodP = [];
  public data_payment: Payment;


  constructor(private _authService: AuthService, private _beerService: BeerService, private _storeService: StoreService,
    private _service: NotificationsService, private _methodService: MethodService, private _sellService: SellService, private _crudService: CRUDService, private router: Router) { }

  ngOnInit() {
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();

    this._storeService.findPayment(this.identity.id).subscribe(
      response => {
        //console.log(response);
        if (response.status == 'error') {
         // this.notificationInfo();
        }
        else {
          //console.log(response);
          this.pagado = response;

          console.log('¿Está pagado este mes? '+this.pagado);
         // this.notificationInfo2();
        }
        //this.p = response.proveedorId;
        //console.log(this.cn);

      },
      error => {
        console.log(<any>error);

      }
    );

    


  }

  payFee() {

    let tipo = $("#credit").is(':checked') == true ? 'credito' : 'debito';
    let NumTarjeta = $("#NumTarjeta").val();
    let nombreTarjeta = $('#nombreTarjeta').val();
    let mes = $('#mes').val();
    let año = $('#año').val();
    let cvv = $('#cvv').val();
    let proveedorId = this.identity.id;


    if(tipo && NumTarjeta && nombreTarjeta && mes && año && cvv && proveedorId){
      let data_payment = [new Payment(tipo, NumTarjeta, nombreTarjeta, mes, año, cvv), proveedorId];

      //console.log(data_payment);

      this._crudService.payFee(data_payment, this.token).subscribe(
        
        response => {
          console.log('Se pagó');
          /*
          $("#eventModal").modal('hide');
          this.suppliersIn = [];
          this.beersIn = [];
          $('#CreateEventForm').trigger("reset");
          */
          this.notificationSucess();
          //this.updateDatable();
          
          this.redirect();
          
        },
        error => {
          console.log('No se pagó', <any>error);

          /*
          console.log(<any>error);
          $("#eventModal").modal('hide');
          */
          this.notificationError();
        }
      );
    }else{
      alert('Informacion suministrada incompleta');
    }
    
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
    this._service.success('Pago realizado', 'Gracias por su tiempo, retire su factura', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  notificationError() {
    this._service.error('Error', 'No fue posible realizar esta operación. Intente mas tarde.', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }
}
