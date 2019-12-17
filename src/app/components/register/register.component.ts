import { Component, OnInit } from '@angular/core';
import {Cliente_natural} from '../../models/cliente_natural';
import { Correo_electronico } from '../../models/correo_electronico';
import { Telefono } from '../../models/telefono';
import { Lugar } from '../../models/lugar';
import {ClienteNaturalService} from '../../services/cliente_natural.services';
import { AuthService } from '../../services/auth.service';
import { PlaceService } from '../../services/places.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ClienteNaturalService, AuthService, PlaceService]
})
export class RegisterComponent implements OnInit {
  public cliente_natural: Cliente_natural;
  public correo_electronico: Correo_electronico;
  public telefono: Telefono;
  public lugar: Lugar;
  public status: string;
  public identity;
  public states;
  public munis;
  public parrs;
  public selectedVendor;

  constructor(
    private _clienteNaturalService: ClienteNaturalService,
    private _authService: AuthService, 
    private _placeService: PlaceService
  ) {
    this.cliente_natural = new Cliente_natural(1, 0, 0, 0, '', '', '', '', null);
    this.correo_electronico = new Correo_electronico(1,'', null, null, null, null);
    this.telefono = new Telefono(0, 0, null, null, null);
    this.lugar = new Lugar(3,'Apure','Estado', null);
     }

  ngOnInit() {
    console.log('FUNCIONA');
    this.identity = this._authService.getIdentity();
    this.loadStates();
  }

  onSubmit(form){
    
    this._clienteNaturalService.register(this.cliente_natural, this.telefono, this.correo_electronico, this.lugar).subscribe(
      response=>{

        if(response.status ==  "success"){
          this.status = response.status;
          form.reset();

      }else{
        this.status = "error";
      }
      error=> {
        console.log(<any>error);
        this.status = "error";
      }
    }
    );
   /* console.log(this.cliente_natural);
    console.log(this.correo_electronico);
    console.log(this.lugar);
    console.log(this.telefono);*/
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

optionSelected3(selectedVendor) {
    
 // this.lugar = selectedVendor
  //console.log(this.lugar);
   /* let array=JSON.parse(selectedVendor);
    this._placeService.getPlaces(array.id).subscribe(     //validar aqui

      response => {
        this.parrs = response;      
        console.log('cargando');

      },

      error => {
        console.log(<any>error);

      }

    );
  }*/

  }
}
