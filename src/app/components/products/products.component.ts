import { Component, OnInit } from '@angular/core';
import { BeerService} from '../../services/beer.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[BeerService]
})
export class ProductsComponent implements OnInit {
  public beers;

  constructor(private _beerService:BeerService) { }

  ngOnInit() {
    this.loadBeers();
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



}
