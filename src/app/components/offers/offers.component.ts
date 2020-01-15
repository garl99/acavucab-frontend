import { Component, OnInit } from '@angular/core';
import { BeerService} from '../../services/beer.service';

@Component({
  selector: 'app-products',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],

})
export class OffersComponent implements OnInit {

  public beers;
  p: number = 1;

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
