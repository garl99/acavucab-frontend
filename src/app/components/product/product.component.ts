import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Beer } from '../../models/beer';
import { AuthService } from '../../services/auth.service';
import { DataVenta } from '../../models/data_venta';
import { CartService } from '../../services/cart.service';
import { SellService } from '../../services/sell.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [BeerService, AuthService, CartService, SellService]
})
export class ProductComponent implements OnInit {

  public beer: Beer;
  public status;
  public identity;

  constructor(
    private _beerService: BeerService, private _router: Router, private _route: ActivatedRoute,
    private authService: AuthService, private _cartService:CartService, private _sellService: SellService
  ) { }


  ngOnInit() {
    this.getBeer();
    this.identity=this.authService.getIdentity();
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


  sell(beer){
    console.log(beer.id);

    let $qty=+($('#inputGroupSelect01').val());

    let data_venta= new DataVenta(beer.id,$qty,this.identity.rol,this.identity.id);


    this._sellService.doSell(data_venta).subscribe(
      response => {
        console.log(response);
      },
      error =>  {
        console.log(<any>error);
        
      }
    );
    
    
    
  }


  cart(beer){
    console.log(beer);


    let $qty=+($('#inputGroupSelect01').val());

    let data_venta= new DataVenta(beer.id,$qty,this.identity.rol,this.identity.id);  //data_carrito


    this._cartService.addCart(data_venta).subscribe(
      response => {
        console.log(response);
      },
      error =>  {
        console.log(<any>error);
        
      }
    );
    
  }


}
