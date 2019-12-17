import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { MethodService } from '../../services/method.service';
import { SellService } from '../../services/sell.service';
import { global } from '../../services/global';
import { DataVenta2 } from 'src/app/models/data_venta';

declare var $;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService, AuthService, MethodService, SellService]
})
export class CartComponent implements OnInit {
  p: number = 1;
  public credit_cards;
  public debit_cards;
  public optionT: number;
  public methodP = [];
  public count: number;
  public items;
  public identity;
  public url;
  public total;

  constructor(private _cartService: CartService, private _authService: AuthService, private _methodService: MethodService,
    private _sellService: SellService) {
    this.url = global.url;

  }

  ngOnInit() {
    this.loadItems();
    localStorage.removeItem('total');
    localStorage.setItem('total', '0');
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

    this.total= +localStorage.getItem('total');
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

    if (this.count == 0) {
      if (this.optionT == 1) {
        this.methodP.push({ id: prueba.id, tipo: 'credito', monto: this.total });
      } else if (this.optionT == 2) {
        this.methodP.push({ id: prueba.id, tipo: 'debito', monto: this.total });
      }
      this.count = 1;
    }
    else {
      this.count = 0;
      this.methodP = [];
      if (this.optionT == 1) {
        this.methodP.push({ id: prueba.id, tipo: 'credito', monto: this.total });
      } else if (this.optionT == 2) {
        this.methodP.push({ id: prueba.id, tipo: 'debito', monto: this.total });
      }
      this.count = 1;
    }

    //console.log(this.methodP);
  }


  sell(){
    let data_venta = new DataVenta2(this.items, this.identity.rol, this.identity.id, this.methodP,true);

    let json = JSON.stringify(data_venta);
    console.log(json);


    this._sellService.doSell2(data_venta);

  }



}
