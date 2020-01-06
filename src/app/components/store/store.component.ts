import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BeerService } from 'src/app/services/beer.service';
import { StoreService } from 'src/app/services/store.service';
import { NotificationsService } from 'angular2-notifications';
declare var $;

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  providers: [AuthService, BeerService, StoreService, NotificationsService]
})
export class StoreComponent implements OnInit {

  p: number = 1;
  public identity;
  public token;
  public beersAvailable;
  public beerSelected: any;
  public beersIn = Array();
  public beersInO: any[];
  public flagCn;
  public flagCj;
  public total;


  constructor(private _authService: AuthService, private _beerService: BeerService, private _storeService: StoreService,
    private _service: NotificationsService) { }

  ngOnInit() {
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();
    localStorage.removeItem('total');
    localStorage.setItem('total', '0');
    this.total = 0;

    this._beerService.getBeers().subscribe(
      response => {
        console.log(response);
        this.beersAvailable = response.beers;

      },
      error => {
        console.log(<any>error);

      }
    );
  }



  addbeer() {

    if (this.beerSelected && $("#qty").val()) {
      var local;
      var num;
      var acu;
      this.beersInO = Object.assign([{}], this.beersIn);
      //console.log(JSON.stringify(this.beersInO));



      for (let beer of this.beersInO) {
        //console.log(beer.nombre);
        if (beer.nombre == this.beerSelected.nombre) {
          alert('Ya eligio esa cerveza. Elija otra');
          return null;
        }
      }

      let subtotal = +$("#qty").val() * this.beerSelected.precio_unitario;
      this.beersIn.push({ id: this.beerSelected.id, nombre: this.beerSelected.nombre, cantidad_cervezas: $("#qty").val(), subtotal: subtotal });
      //console.log(this.beersIn);
      alert('Cervezar añadida. Elija otra si desea');
      $("#select3").val($("#select3 option:first").val());
      $("#qty").val('');
      this.beerSelected = 0;

      local = localStorage.getItem('total');
      num = parseInt(local);

      acu = subtotal + num;

      localStorage.setItem('total', acu);

      this.total = acu;

    }
    else {
      alert('Debe seleccionar primero una cerveza');
    }


  }

  deleteBeerIn(id) {
    var local;
    var num;
    var acu;
    console.log(id);
    for (let i = 0; i < this.beersIn.length; i++) {

      if (this.beersIn[i].id == id) {
        local = localStorage.getItem('total');
        num = parseInt(local);
  
        acu = num-this.beersIn[i].subtotal;
  
        localStorage.setItem('total', acu);
  
        this.total = acu;
        this.beersIn.splice(i, 1);
      }
      console.log(this.beersIn);
    }

  }

  optionSelected5(selectedVendor) {

    let array = JSON.parse(selectedVendor);
    this.beerSelected = array;
    //console.log(this.beerSelected);


  }

  findClient() {
    let ci = $("#ci").val();
    console.log(ci);

    this._storeService.findClient(ci).subscribe(
      response => {
        console.log(response);
        if (response.status == 'error') {
          this.notificationInfo();
        }
      },
      error => {
        console.log(<any>error);

      }
    );

  }

  findClient2() {
    let rif = $("#rif").val();
    console.log(rif);

    this._storeService.findClient2(rif).subscribe(
      response => {
        console.log(response);
        if (response.status == 'error') {
          this.notificationInfo();
        }
      },
      error => {
        console.log(<any>error);

      }
    );

  }

  typeClient() {
    if ($("#cn").is(':checked') == true) {
      //alert("Cliente Natural");
      this.flagCn = 1;
      this.flagCj = 0;
    }
    else if ($("#cj").is(':checked') == true) {
      //alert("Cliente Juridico");
      this.flagCn = 0;
      this.flagCj = 1;
    }
  }

  notificationInfo() {
    this._service.info('Info', 'El cliente no se encuentra registrado. Dirigase a gestion de clientes', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }


}
