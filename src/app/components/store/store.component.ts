import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BeerService } from 'src/app/services/beer.service';
import { StoreService } from 'src/app/services/store.service';
import { NotificationsService } from 'angular2-notifications';
import { MethodService } from 'src/app/services/method.service';
import { error } from 'protractor';
import { DataVenta3 } from 'src/app/models/data_venta';
import { SellService } from 'src/app/services/sell.service';
import { EventService } from 'src/app/services/events.service';
declare var $;

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  providers: [AuthService, BeerService, StoreService, NotificationsService, MethodService, SellService, EventService]
})
export class StoreComponent implements OnInit {

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
  public methodP = [];
  public data_venta: DataVenta3;
  public flagEvent = 0;
  public events;
  public event; public beersEvents;


  constructor(private _authService: AuthService, private _beerService: BeerService, private _storeService: StoreService,
    private _service: NotificationsService, private _methodService: MethodService, private _sellService: SellService, private _eventService: EventService) { }

  ngOnInit() {
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();
    localStorage.removeItem('total');
    localStorage.setItem('total', '0');
    this.total = 0;

    this._beerService.getBeers().subscribe(
      response => {
        console.log(response);
        this.beersAvailable = response.beers;

      },
      error => {
        console.log(<any>error);

      }
    );

    this._eventService.getAllEvents().subscribe(
      response => {
        this.events = response.events;

      },
      error => {
        console.log(<any>error);
        console.log('Algo fallo');

      }
    );



  }

  optionSelected6(selectList6) {
    let array = JSON.parse(selectList6);
    this.event = array;
    console.log(this.event.id);

    this._eventService.getAllBeersEvents(this.event.id).subscribe(
      response => {
        //console.log(response);
        this.beersEvents = response;
        console.log(this.beersEvents);

      },
      error => {
        console.log(<any>error);
      }
    );

  }


  addbeer() {

    if (this.beerSelected && $("#qty").val()) {
      let sub 
      if(this.flagEvent==1){
        sub = this.beerSelected.cantidad_cervezas - $("#qty").val();
        console.log(sub);
      }
      else{
        sub = this.beerSelected.disponible - $("#qty").val();
        console.log(sub);
      }

      if (sub >= 0) {
        var local;
        var num;
        var acu;
        this.beersInO = Object.assign([{}], this.beersIn);
        //console.log(JSON.stringify(this.beersInO));



        for (let beer of this.beersInO) {
          //console.log(beer.nombre);
          if (beer.nombre == this.beerSelected.nombre) {
            alert('Ya eligio esa cerveza. Elija otra');
            return null;
          }
        }

        let subtotal = +$("#qty").val() * this.beerSelected.precio_unitario;
        if (this.flagEvent) {
          this.beersIn.push({ id: this.beerSelected.cerveza_id, nombre: this.beerSelected.nombre, cantidad_cervezas: $("#qty").val(), precio_unitario: this.beerSelected.precio_unitario, precio: subtotal });
        }
        else {
          this.beersIn.push({ id: this.beerSelected.id, nombre: this.beerSelected.nombre, cantidad_cervezas: $("#qty").val(), precio_unitario: this.beerSelected.precio_unitario, precio: subtotal });
        }

        //console.log(this.beersIn);
        alert('Cervezar añadida. Elija otra si desea');
        $("#select3").val($("#select3 option:first").val());
        $("#qty").val('');
        this.beerSelected = 0;

        local = localStorage.getItem('total');
        num = parseInt(local);

        acu = subtotal + num;

        localStorage.setItem('total', acu);

        this.total = acu;
      }
      else{
        alert('Cantidad no disponible');
        return null;
      }

    }
    else {
      alert('Debe seleccionar primero una cerveza');
    }


  }

  deleteBeerIn(id) {
    var local;
    var num;
    var acu;
    console.log(id);
    for (let i = 0; i < this.beersIn.length; i++) {

      if (this.beersIn[i].id == id) {
        local = localStorage.getItem('total');
        num = parseInt(local);

        acu = num - this.beersIn[i].precio;

        localStorage.setItem('total', acu);

        this.total = acu;
        this.beersIn.splice(i, 1);
      }
      console.log(this.beersIn);
    }

  }

  optionSelected5(selectedVendor) {

    let array = JSON.parse(selectedVendor);
    this.beerSelected = array;
    //console.log(this.beerSelected);


  }

  findClient() {
    let ci = $("#ci").val();
    console.log(ci);

    this._storeService.findClient(ci).subscribe(
      response => {
        console.log(response);
        if (response.status == 'error') {
          this.notificationInfo();
        }
        else {
          this.notificationInfo2();
        }
        this.cn = response.cliente_natural;
        //console.log(this.cn);

      },
      error => {
        console.log(<any>error);

      }
    );

  }

  findClient2() {
    let rif = $("#rif").val();
    console.log(rif);

    this._storeService.findClient2(rif).subscribe(
      response => {
        console.log(response);
        if (response.status == 'error') {
          this.notificationInfo();
        } else {
          this.notificationInfo2();
        }
        this.cj = response.cliente_juridico;


        //console.log(this.cj);

      },
      error => {
        console.log(<any>error);

      }
    );

  }

  typeClient() {
    if ($("#cn").is(':checked') == true) {
      //alert("Cliente Natural");
      this.flagCn = 1;
      this.flagCj = 0;
    }
    else if ($("#cj").is(':checked') == true) {
      //alert("Cliente Juridico");
      this.flagCn = 0;
      this.flagCj = 1;
    }
  }

  typePayment() {
    if ($("#credit").is(':checked') == true) {
      this.flagCredit = 1;

      if (this.cn) {
        this._methodService.getCards(this.cn.id, 'rol_clienten', 'credito').subscribe(
          response => {
            this.credit_cards = response;
          },
          error => {
            console.log(<any>error);

          }
        );
      } else {
        this._methodService.getCards(this.cj.id, 'rol_clientej', 'credito').subscribe(
          response => {
            this.debit_cards = response;
          },
          error => {
            console.log(<any>error);

          }
        );
      }
    }
    if ($("#debit").is(':checked') == true) {
      this.flagDebit = 1;
      if (this.cn) {
        this._methodService.getCards(this.cn.id, 'rol_clienten', 'debito').subscribe(
          response => {
            this.credit_cards = response;
          },
          error => {
            console.log(<any>error);

          }
        );
      } else {
        this._methodService.getCards(this.cj.id, 'rol_clientej', 'debito').subscribe(
          response => {
            this.debit_cards = response;
          },
          error => {
            console.log(<any>error);

          }
        );
      }
    }
    if ($("#cash").is(':checked') == true) {
      this.flagCash = 1;
      this.methodP.push({ id: 0, tipo: 'efectivo', monto: this.total });
    }

    if ($("#cash2").is(':checked') == true) {
      this.flagCash2 = 1;

      this.flagCash = 1;
      this.methodP.push({ id: 0, tipo: 'divisa', monto: this.total });
    }
  }

  notificationInfo() {
    this._service.info('Info', 'El cliente no se encuentra registrado. Dirigase a gestion de clientes', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  notificationInfo2() {
    this._service.info('Info', 'El cliente encontrado en nuestro sistema', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }


  deleteOption1() {
    $("#credit").prop('checked', false);
    this.flagCredit = 0;

    for (let i = 0; i < this.methodP.length; i++) {

      if (this.methodP[i].tipo == 'credito') {
        this.methodP.splice(i, 1);
      }
      console.log(this.methodP);
    }

  }

  deleteOption2() {
    $("#debit").prop('checked', false);
    this.flagDebit = 0;

    for (let i = 0; i < this.methodP.length; i++) {

      if (this.methodP[i].tipo == 'debito') {
        this.methodP.splice(i, 1);
      }
      console.log(this.methodP);
    }
  }
  deleteOption3() {
    $("#cash").prop('checked', false);
    this.flagCash = 0;


    for (let i = 0; i < this.methodP.length; i++) {

      if (this.methodP[i].tipo == 'efectivo') {
        this.methodP.splice(i, 1);
      }
      console.log(this.methodP);
    }
  }
  deleteOption4() {
    $("#cash2").prop('checked', false);
    this.flagCash2 = 0;


    for (let i = 0; i < this.methodP.length; i++) {

      if (this.methodP[i].tipo == 'divisa') {
        this.methodP.splice(i, 1);
      }
      console.log(this.methodP);
    }
  }

  optionSelectedM(methodPayment) {
    let prueba = JSON.parse(methodPayment);

    if (this.flagCredit == 1) {
      this.methodP.push({ id: prueba.id, tipo: 'credito', monto: this.total });
    }
    if (this.flagDebit == 1) {
      this.methodP.push({ id: prueba.id, tipo: 'debito', monto: this.total });
    }
    //Falta efectivo y divisa
    console.log(this.methodP);
  }

  sell() {

    if (this.cn) {
      if (this.flagEvent) {
        this.data_venta = new DataVenta3(this.beersIn, 'rol_clienten', this.cn.id, this.methodP, false, this.flagEvent, this.event.id, this.identity.id,0);
      }
      else {
        this.data_venta = new DataVenta3(this.beersIn, 'rol_clienten', this.cn.id, this.methodP, false, this.flagEvent, 0, this.identity.id,0);
      }

    } else {
      if (this.flagEvent) {
        this.data_venta = new DataVenta3(this.beersIn, 'rol_clientej', this.cn.id, this.methodP, false, this.flagEvent, this.event.id, this.identity.id,0);
      }
      else {
        this.data_venta = new DataVenta3(this.beersIn, 'rol_clientej', this.cn.id, this.methodP, false, this.flagEvent, 0, this.identity.id,0);
      }
    }

    let json = JSON.stringify(this.data_venta);
    console.log(json);
    console.log(this.data_venta);



    this._sellService.doSell2(this.data_venta).subscribe(
      response => {
        console.log(response);
        this.notificationSucessBuy();
        this.update();
      },
      error => {
        console.log(<any>error);
        this.notificationActionError();

      }
    );


  }

  allEvent() {
    if ($('#inputL').prop('checked')) {
      $("#myModal").modal('show');
      this.flagEvent = 1;
      console.log(this.flagEvent);


    }
    else {
      console.log("Salio");
      this.flagEvent = 0;
      console.log(this.flagEvent);


    }
  }

  notificationSucessBuy() {
    this._service.success('Compra realizada', 'Gracias por su comprar, retire su factura', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  notificationActionError() {
    this._service.error('Error', 'No fue posible realizar esta operación. Intente mas tarde.', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  notificationInfoUpdate() {
    this._service.info('Actualizando...', 'Por favor, espere', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  update() {
    setTimeout(function () {
      $(function () {
        location.reload();
      });
    }, 2000);
    this.notificationInfoUpdate();
  }

}
