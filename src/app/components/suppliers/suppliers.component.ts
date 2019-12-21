import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import idiom from '../../idiom';
import { CustomersNService } from '../../services/n-customers.service';
import { AuthService } from '../../services/auth.service';
import { PlaceService } from '../../services/places.service';
import { Suppliers } from 'src/app/models/suppliers';
import { CRUDService } from 'src/app/services/crud.service';
declare var $;

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
  providers: [CustomersNService, AuthService, PlaceService,CRUDService]
})
export class SuppliersComponent implements OnInit {

  public suppliers;
  public states;
  public munis;
  public parrs;
  public identity;
  public lugar;

  constructor(private _customersNService: CustomersNService, private _placeService: PlaceService,
    private _authService: AuthService,private _crudService: CRUDService) { }

  ngOnInit() {
    this.identity = this._authService.getIdentity();
    this.loadStates();
    this._customersNService.getSuppliers().subscribe(
      response => {
        console.log(response);
        this.suppliers = response;

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
    this.lugar = array.nombre;
    console.log(array);
  }

  onSubmit(Form) {
    let rif = ($('#rif').val());
    let denomi = ($('#denomi_comercial').val());
    let razon = ($('#razon_social').val());
    let clave_area = ($('#clave_area').val());
    let numero = ($('#numero').val());
    let correo = ($('#correo').val());
    let pd = ($('#pagina_web').val());
    let lugar = this.lugar;
    let lugar2 = this.lugar;
    let direccion_fisica = ($('#direccion_fisica').val());
    let direccion_fiscal = ($('#direccion_fiscal').val());

    let data = new Suppliers(rif, denomi, razon, lugar,
      lugar2, direccion_fisica, direccion_fiscal, pd, numero,
      clave_area, correo);


    console.log(JSON.stringify(data));

    this._crudService.registerProveedor(data).subscribe(
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
    this._crudService.getdelete3(id).subscribe(
      response  =>{
        console.log('Se elimino');
      },
      error=>{
        console.log('Fallo');
      } 

    )}

 


}


