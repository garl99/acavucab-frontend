import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Beer } from '../../models/beer';
import { AuthService } from '../../services/auth.service';
import { DataVenta } from '../../models/data_venta';
import { CartService } from '../../services/cart.service';
import { SellService } from '../../services/sell.service';
import { MethodService } from '../../services/method.service';
import { NotificationsService } from 'angular2-notifications';
import { error } from 'protractor';

declare var $;


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [BeerService, AuthService, CartService, SellService, MethodService, NotificationsService]
})
export class ProductComponent implements OnInit {
  public credit_cards;
  public debit_cards;
  public beer: Beer;
  public optionT: number;
  public status;
  public identity;
  public methodP;
  public methodPIn = [];
  public count: number;
  public myPoints;
  public tas;
  public ch;
  public available;
  public rest;
  public pointsToBs;

  constructor(
    private _beerService: BeerService, private _router: Router, private _route: ActivatedRoute,
    private _authService: AuthService, private _cartService: CartService, private _sellService: SellService,
    private _methodService: MethodService, private _service: NotificationsService
  ) { }


  ngOnInit() {
    this.ch = 0;
    this.getBeer();
    this.identity = this._authService.getIdentity();
    console.log(this.identity.id);

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
    console.log(this.identity);


  }

  getBeer() {

    //Sacar id del post de la url

    this._route.params.subscribe(

      params => {

        let id = +params['id'];

        //Peticion ajax del servicio post para conseguir los detalles

        this._beerService.getBeer(id).subscribe(

          response => {

            if (response.status == 'success') {

              this.status = response.status;
              this.beer = response.beer;

              this._beerService.getAvailable(this.beer.id).subscribe(
                response => {
                  this.available = response.disponible;
                  console.log(response);

                },
                error => {
                  console.log(<any>error);

                }
              );
              //console.log(this.beer);
              //console.log(this.beer.nombre);



            }
            else {
              this.status = 'error';
              this._router.navigate(['dashboard']);
            }


          },

          error => {
            this.status = 'error';
            console.log(<any>error);
            this._router.navigate(['dashboard']);
          }

        );
      }
    );

  }

  openModal(beer) {
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

    let qty = +($('#inputGroupSelect01').val());
    let price = qty * beer.precio_unitario;

    $('#price').text(price);


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

    console.log(price2);
    

    if (this.count == 0) {
      if (this.optionT == 1) {
        if (this.rest>0) {
          this.methodP={ id: prueba.id, tipo: 'credito', monto: price2 };
        }
        else {
          this.methodP={ id: prueba.id, tipo: 'credito', monto: price };
        }
      }
      else if (this.optionT == 2) {
        if (this.rest>0) {
          this.methodP={ id: prueba.id, tipo: 'debito', monto: price2 };
        }else{
          this.methodP={ id: prueba.id, tipo: 'debito', monto: price };
        }
      }
      this.count = 1;
    }
    else {
      this.count = 0;
      this.methodP = [];
      if (this.optionT == 1) {
        this.methodP={ id: prueba.id, tipo: 'credito', monto: price };
      } else if (this.optionT == 2) {
        this.methodP={ id: prueba.id, tipo: 'debito', monto: price };
      }
      this.count = 1;
    }

    //console.log(this.methodP);
  }

  sell(beer) {
    //console.log(this.methodP);
    //console.log(beer.id);

    let qty;
    qty = +($('#inputGroupSelect01').val());
    let chi = +$('#ch').val();
    let avai = this.available - qty;
    let Bs = qty * beer.precio_unitario;


    if (this.optionT != 3) {
      this.methodPIn.push(this.methodP);
    }


    if (avai >= 0) {

      if (this.optionT == 3 && chi <= this.myPoints) {
        this.ch = +($('#ch').val());
        this.pointsToBs = this.ch * this.tas;
        console.log(this.pointsToBs);

        this.rest = Bs - this.pointsToBs;
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

      let data_venta = new DataVenta(beer.id, qty, this.identity.rol, this.identity.id, this.ch, this.methodPIn);

      let json = JSON.stringify(data_venta);
      console.log(data_venta);

      this._sellService.doSell(data_venta).subscribe(
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
    else {
      alert("Cantidad no disponible");
    }
  }

  cart(beer) {
    console.log(beer);


    let $qty = +($('#inputGroupSelect01').val());

    let data_venta = new DataVenta(beer.id, $qty, this.identity.rol, this.identity.id, 0, null);  //data_carrito


    console.log(JSON.stringify(data_venta));

    this._cartService.addCart(data_venta).subscribe(
      response => {
        console.log(response);
        this.notificationSucessCart();
      },
      error => {
        console.log(<any>error);
        this.notificationActionError();

      }
    );

  }



  notificationSucessCart() {
    this._service.success('Agregado al carrito', 'Cerveza agregada al carrito exitosamente', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
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
