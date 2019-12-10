import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { QuoteService } from '../../services/quote.service';
import { AuthService } from '../../services/auth.service';


declare var $;


@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css'],
  providers: [BeerService,QuoteService, AuthService]
})
export class QuoteComponent implements OnInit {
  public beers;
  public myBeer;
  public jsonArray = [];    //Array de objetos
  public total;
  public status;
  public identity;




  constructor(private _beerService: BeerService, private _quoteService: QuoteService, private _authService:AuthService) { }

  ngOnInit() {
    this.loadBeers();
    localStorage.removeItem('quote');
    localStorage.setItem('quote', '0');
    this.total = 0;
    this.identity=this._authService.getIdentity();
  }

  loadBeers() {
    this._beerService.getBeers().subscribe(
      response => {
        this.beers = response.beers;
        console.log(this.beers);

      },
      error => {
        console.log(<any>error);
      }

    );
  }

  checkClick(beer) {
    if ($('#check' + beer.id).prop('checked')) {
      $("#myModalLabel").text(beer.nombre);
      $("#myModal").modal('show');
      this.myBeer = beer;


    }
    else {
      this.myBeer = null;

    }


  }

  close() {
    let detail: {}
    var local;
    var num;
    var price;
    var acu;
    var qty = $("#qty").val();
  
    $("#myModal").modal('hide');
    price = this.myBeer.precio_unitario * qty;

    local = localStorage.getItem('quote');
    num = parseInt(local);

    acu = price + num;

    localStorage.setItem('quote', acu);

    this.total = acu;

    this.jsonArray.push({ cliente:this.identity.id,id: this.myBeer.id, nombre:this.myBeer.nombre, precio:this.myBeer.precio_unitario, cantidad_cervezas:qty});
    
  

  }


  reserve(){
    this._quoteService.doQuote(this.jsonArray).subscribe(
      response=>{
        console.log(response);

      },
      error=>{
        this.status = 'error';
        console.log('Ha ocurrido un error QuoteComponent linea 98');
        
      }

    );

  }

}
