import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Beer } from '../../models/beer';
import { AuthService } from '../../services/auth.service';
import { DataVenta } from '../../models/data_venta';
import { CartService } from '../../services/cart.service';
import { SellService } from '../../services/sell.service';
import { MethodService } from '../../services/method.service';

declare var $;


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [BeerService, AuthService, CartService, SellService, MethodService]
})
export class ProductComponent implements OnInit {
  public credit_cards;
  public debit_cards;
  public beer: Beer;
  public optionT: number;
  public status;
  public identity;
  public methodP = [];
  public count: number;

  constructor(
    private _beerService: BeerService, private _router: Router, private _route: ActivatedRoute,
    private _authService: AuthService, private _cartService: CartService, private _sellService: SellService,
    private _methodService: MethodService
  ) { }


  ngOnInit() {
    this.getBeer();
    this.identity = this._authService.getIdentity();
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
              console.log(this.beer);
              console.log(this.beer.nombre);



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

    if (this.count == 0) {
      if (this.optionT == 1) {
        this.methodP.push({ id: prueba.id, tipo: 'credito', monto: price });
      } else if (this.optionT == 2) {
        this.methodP.push({ id: prueba.id, tipo: 'debito', monto: price });
      }
      this.count = 1;
    }
    else {
      this.count = 0;
      this.methodP = [];
      if (this.optionT == 1) {
        this.methodP.push({ id: prueba.id, tipo: 'credito', monto: price });
      } else if (this.optionT == 2) {
        this.methodP.push({ id: prueba.id, tipo: 'debito', monto: price });
      }
      this.count = 1;
    }

    //console.log(this.methodP);
  }

  sell(beer) {
    //console.log(this.methodP);
    //console.log(beer.id);

    let qty = +($('#inputGroupSelect01').val());

    let data_venta = new DataVenta(beer.id, qty, this.identity.rol, this.identity.id, this.methodP);

    let json = JSON.stringify(data_venta);
    console.log(json);

    this._sellService.doSell(data_venta).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);

      }
    );
    $('#PagoModal').modal('hide');



  }


  cart(beer) {
    console.log(beer);


    let $qty = +($('#inputGroupSelect01').val());

    let data_venta = new DataVenta(beer.id, $qty, this.identity.rol, this.identity.id, null);  //data_carrito


    console.log(JSON.stringify(data_venta));
    
    this._cartService.addCart(data_venta).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);

      }
    );

  }


}
