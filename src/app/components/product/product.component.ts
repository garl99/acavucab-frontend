import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Beer } from '../../models/beer';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [BeerService]
})
export class ProductComponent implements OnInit {

  public beer: Beer;
  public status;

  constructor(
    private _beerService: BeerService, private _router: Router,private _route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.getBeer();
    console.log(this.beer);
    
  }

  getBeer(){

    //Sacar id del post de la url

    this._route.params.subscribe(

      params => {

        let id= +params['id'];

        //Peticion ajax del servicio post para conseguir los detalles

        this._beerService.getBeer(id).subscribe(

          response => {
            
            if(response.status == 'success'){

              this.status=response.status;
              this.beer=response.beer;
              console.log(this.beer);
              console.log(this.beer.nombre);

              

            }
            else{
              this.status='error';
              this._router.navigate(['dashboard']);
            }


          },

          error => {
            this.status='error';
            console.log(<any>error);
            this._router.navigate(['dashboard']);
          }

        );


      }



    );


  }



}
