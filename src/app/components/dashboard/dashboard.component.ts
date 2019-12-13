import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PlaceService } from '../../services/places.service';
declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService, PlaceService]
})
export class DashboardComponent implements OnInit {
  public identity;
  public states;
  public munis;
  public parrs;

  constructor(private _authService: AuthService, private _placeService: PlaceService) { }

  ngOnInit() {
    this.identity = this._authService.getIdentity();
    this.loadStates();

  }

  action() {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  }


  loadStates() {
    this._placeService.getStates().subscribe(     //validar aqui

      response => {
        this.states = response;
        console.log('cargando estados de venezuela');
      },

      error => {
        console.log(<any>error);

      }

    );


  }

  optionSelected(selectedVendor) {

    this.parrs=null;
    this.munis=null;
    
    let array=JSON.parse(selectedVendor);
    this._placeService.getPlaces(array.id).subscribe(     //validar aqui

      response => {
        this.munis = response;      
        console.log('cargando Municipio de estado seleccionado');

      },

      error => {
        console.log(<any>error);

      }

    );
  }

  optionSelected2(selectedVendor) {
    
    let array=JSON.parse(selectedVendor);
    this._placeService.getPlaces(array.id).subscribe(     //validar aqui

      response => {
        this.parrs = response;      
        console.log('cargando Parroquias de Municipio seleccionado');

      },

      error => {
        console.log(<any>error);

      }

    );
  }


}
