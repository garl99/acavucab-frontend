import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { MethodService } from '../../services/method.service';
import { SellService } from '../../services/sell.service';
import { global } from '../../services/global';
import { DataVenta3 } from 'src/app/models/data_venta';
import { NotificationsService } from 'angular2-notifications';

declare var $;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService, AuthService, MethodService, SellService, NotificationsService]
})
export class CartComponent implements OnInit, DoCheck {
  p: number = 1;
  public credit_cards;
  public debit_cards;
  public optionT: number;
  public methodP;
  public methodPIn = [];
  public count: number;
  public items;
  public identity;
  public url;
  public total;
  public myPoints;
  public tas;
  public ch;
  public available;
  public rest;
  public pointsToBs;

  constructor(private _cartService: CartService, private _authService: AuthService, private _methodService: MethodService,
    private _sellService: SellService, private _service: NotificationsService) {
    this.url = global.url;

  }

  ngOnInit() {
    //this.ch = 0;
    this.loadItems();

    this._authService.myPoints(this.identity.id, this.identity.rol).subscribe(
      response => {
        //console.log(response);
        this.myPoints = response.puntos_actuales;
        this.tas = response.tasa;

      },
      error => {
        console.log(<any>error);

      }
    );
    localStorage.removeItem('total');
    localStorage.setItem('total', '0');
  }

  ngDoCheck() {
    this.total = parseInt(localStorage.getItem('total'));
  }


  loadItems() {
    var local;
    var num;
    var acu;
    this.identity = this._authService.getIdentity();
    this._cartService.getCart(this.identity).subscribe(
      response => {
        this.items = response;
        console.log(this.items);
        for (let item of this.items) {
          local = localStorage.getItem('total');
          num = parseInt(local);

          acu = item.precio + num;

          localStorage.setItem('total', acu);
        }
      },
      error => {
        console.log(<any>error);

      }

    );

    this.total = +localStorage.getItem('total');
    console.log(this.total);

  }

  openModal() {
    this.count = 0;
    this.methodP = [];
    this.optionT = 0;
    $('#PagoModal').modal('show');
    this._methodService.getCards(this.identity.id, this.identity.rol, 'credito').subscribe(
      response => {
        this.credit_cards = response;
      },

      error => {
        console.log(<any>error);

      }

    );

    this._methodService.getCards(this.identity.id, this.identity.rol, 'debito').subscribe(
      response => {
        this.debit_cards = response;
      },

      error => {
        console.log(<any>error);

      }

    );

    $('#price').text(this.total);


  }

  optionSelectedType(option) {
    //console.log(option);
    if (option == 'Tarjeta de credito') {
      this.optionT = 1;
    } else if (option == 'Tarjeta de debito') {
      this.optionT = 2;
    }
    else if (option == 'Mis puntos') {
      this.optionT = 3;

    }

    //console.log(this.debit_cards);
    //console.log(this.credit_cards);
  }


  optionSelectedM(methodPayment, beer) {
    let prueba = JSON.parse(methodPayment);
    let qty = +($('#inputGroupSelect01').val());
    let price = qty * beer.precio_unitario;
    let price2 = this.rest;

    if (this.count == 0) {
      if (this.optionT == 1) {
        if (this.rest > 0) {
          this.methodP = { id: prueba.id, tipo: 'credito', monto: price2 };
        }
        else {
          this.methodP = { id: prueba.id, tipo: 'credito', monto: this.total };
        }
      } else if (this.optionT == 2) {
        if (this.rest > 0) {
          this.methodP = { id: prueba.id, tipo: 'debito', monto: price2 };
        }
        else {
          this.methodP = { id: prueba.id, tipo: 'debito', monto: this.total };
        }
      }
      this.count = 1;
    }
    else {
      this.count = 0;
      this.methodP = [];
      if (this.optionT == 1) {
        this.methodP = { id: prueba.id, tipo: 'credito', monto: this.total };
      } else if (this.optionT == 2) {
        this.methodP = { id: prueba.id, tipo: 'debito', monto: this.total };
      }
      this.count = 1;
    }

    //console.log(this.methodP);
  }


  sell() {

    let chi = +$('#ch').val();


    if (this.optionT != 3) {
      this.methodPIn.push(this.methodP);
    }

    if (this.optionT == 3 && chi <= this.myPoints) {
      this.ch = +($('#ch').val());
      this.pointsToBs = this.ch * this.tas;
      console.log(this.pointsToBs);

      this.rest = this.total - this.pointsToBs;
      if (this.rest > 0) {
        this.optionT = 0;
        $('#selectList3Type').val('null');

        let dataPoint = {
          'id': 0, 'tipo': 'mis_puntos', 'monto': this.pointsToBs
        };

        $('#price').text(this.rest);

        this.methodPIn.push(dataPoint);
        console.log(this.methodPIn);
        console.log(JSON.stringify(this.methodPIn));

        alert('Por favor indique otro metodo de pago');
        return null;
      }
      console.log(this.ch);
    } else if (this.optionT == 3 && chi > this.myPoints) {
      alert('No posee esa cantidad de puntos');
      return null;
    }

    let data_venta = new DataVenta3(this.items, this.identity.rol, this.identity.id, this.methodPIn, true, 0, 0, 0, this.ch);

    let json = JSON.stringify(data_venta);
    console.log(data_venta);


    this._sellService.doSell2(data_venta).subscribe(
      response => {
        console.log(response);
        this.notificationSucessBuy();
      },
      error => {
        console.log(<any>error);
        this.notificationActionError();

      }
    );

    $('#PagoModal').modal('hide');

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


}
