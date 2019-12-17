import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService, AuthService]
})
export class CartComponent implements OnInit {

  public items;
  public identity;

  constructor(private _cartService: CartService, private _authService: AuthService) {

  }

  ngOnInit() {

    this.loadItems();
  }

  loadItems() {
    this.identity = this._authService.getIdentity();
    this._cartService.getCart(this.identity).subscribe(
      response => {
        this.items = response;
        console.log(this.items);
      },
      error => {
        console.log(<any>error);

      }

    );

  }

}
