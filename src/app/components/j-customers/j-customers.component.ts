import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import idiom from '../../idiom';
import { CustomersNService } from '../../services/n-customers.service';
import { AuthService } from '../../services/auth.service';
import { PlaceService } from '../../services/places.service';
import { CustomersJ } from 'src/app/models/j-customers';
import { ServicioConTodoService } from 'src/app/services/serviciocontodo.service';


declare var $;

@Component({
  selector: 'app-j-customers',
  templateUrl: './j-customers.component.html',
  styleUrls: ['./j-customers.component.css'],
  providers: [CustomersNService, AuthService, PlaceService, ServicioConTodoService]
})
export class JCustomersComponent implements OnInit {

  public clientesj;
  public identity;
  public states;
  public munis;
  public parrs;
  public states2;
  public munis2;
  public parrs2;
  public lugar;

  constructor(private _customersNService: CustomersNService,
    private _placeService: PlaceService,
    private _authService: AuthService,private _conto: ServicioConTodoService) { }

  ngOnInit() {
    this.identity = this._authService.getIdentity();
    this.loadStates();
    this.loadStates2();
    this._customersNService.getCustomerj().subscribe(
      response => {
        console.log(response);
        this.clientesj = response;

      },
      error => {
        console.log(<any>error);
      }
    );

    setTimeout(function () {      //Renderiza la tabla
      $(function () {
        $('#dataTable').DataTable({
          "pageLength": 8,
          "lengthMenu": [[8, 16, 24, -1], [8, 16, 24, "Todos"]],
          "language": idiom
        });
      });
    }, 5000);
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

  loadStates2() {
    this._placeService.getStates().subscribe(     //validar aqui

      response => {
        this.states2 = response;
        console.log('cargando estados de venezuela');
      },

      error => {
        console.log(<any>error);

      }

    );


  }

  optionSelected(selectedVendor) {

    this.parrs = null;
    this.munis = null;

    let array = JSON.parse(selectedVendor);
    this._placeService.getPlaces(array.id).subscribe(     //validar aqui

      response => {
        this.munis = response;
        console.log('cargando Municipio de Estado seleccionado');

      },

      error => {
        console.log(<any>error);

      }

    );
  }

  optionSelected2(selectedVendor) {

    let array = JSON.parse(selectedVendor);
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

    let array = JSON.parse(selectedVendor);
    this.lugar=array.nombre;
    console.log(array);
  }


  optionSelected4(selectedVendor) {

    this.parrs2 = null;
    this.munis2 = null;

    let array = JSON.parse(selectedVendor);
    this._placeService.getPlaces(array.id).subscribe(     //validar aqui

      response => {
        this.munis2 = response;
        console.log('cargando Municipio de Estado seleccionado');

      },

      error => {
        console.log(<any>error);

      }

    );
  }
  /*        public rif:number,
        public denomin_comercial:string,
        public razon_social:string,
        public capital_social:string,
        public lugar:string,
        public lugar2:string,
        public direccion_fisica:string,
        public direccion_fical: string,
        public correo:string,
        public pagina_web:string,
        public nombre:string,
        public apellido:string,
        public numero:string,
        public clave_area:string,
        public cedula:string,
        public numero_contacto:string,
        public clave_area_contacto:string,*/ 

  onSubmit(Form){

    let rif=($('#rif').val());
    let denomi=($('#denominacion_comercial').val());
    let razon=($('#razon_social').val());
    let capital_social=($('#capital_social').val());
    let nombre=($('#apellido').val());
    let apellido=($('#apellido').val());
    let cedula=($('#cedula').val());
    let clave_area=($('#clave_area').val());
    let numero=($('#numero_contacto').val());
    let cla=($('#clave_area_contacto').val());
    let correo=($('#correo').val());
    let pd=($('#pagina_web').val());
    let lugar=this.lugar;
    let lugar2=this.lugar;
    let direccion_fisica=($('#dirfisica').val());
    let direccion_fiscal=($('#dirfiscal').val());

    let data=new CustomersJ(rif,denomi,razon,capital_social,
      lugar,lugar2,direccion_fisica,direccion_fiscal,correo,pd,nombre,apellido,numero,clave_area,cedula,numero,cla);
  
      console.log(JSON.stringify(data));
      this._conto.registerJuridico(data).subscribe(
        response  =>{
          console.log('Se agrego');
        },
        error=>{
          console.log('Fallo');
        }
      );
      $('#modal').modal('hide');

  }

  delete(id){
    this._conto.getdelete2(id).subscribe(
      response  =>{
        console.log('Se elimino');
      },
      error=>{
        console.log('Fallo');
      } 

    )}
  
}
