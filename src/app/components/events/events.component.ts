import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/events.service';
import idiom from '../../idiom';
import { CustomersNService } from 'src/app/services/n-customers.service';
import { BeerService } from 'src/app/services/beer.service';
import { PlaceService } from 'src/app/services/places.service';
import { CRUDService } from 'src/app/services/crud.service';
import { FormGroup } from '@angular/forms';

declare var $;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [AuthService, EventService, CustomersNService, BeerService, PlaceService, CRUDService]
})
export class EventsComponent implements OnInit {
  public identity;
  public token;
  public events;
  public suppliers;
  public supplierSelected;
  public suppliersIn = Array();
  public beersAvailable;
  public suppliersInO: any[];
  public beerSelected: any;
  public beersIn = Array();
  public beersInO: any[];
  public states;
  public munis;
  public parrs;
  public lugar;

  constructor(private _authService: AuthService, private _eventService: EventService,
    private _supplierService: CustomersNService, private _beerService: BeerService,
    private _placeService: PlaceService, private _crudService: CRUDService) { }

  ngOnInit() {
    this.loadStates();
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();

    this._supplierService.getSuppliers().subscribe(
      response => {
        //console.log(response);
        this.suppliers = response;
      },
      error => {
        console.log(error);
      }
    );
    this._eventService.getAllEvents().subscribe(
      response => {
        //console.log(response);
        this.events = response.events;
        //console.log(this.events);

      },
      error => {
        console.log(<any>error);
        console.log('Algo fallo');

      }
    );

    setTimeout(function () {
      $(function () {
        $('#dataTable').DataTable({
          "destroy": true,
          "pageLength": 8,
          "lengthMenu": [[8, 16, 24, -1], [8, 16, 24, "Todos"]],
          "language": idiom
        });
      });
    }, 2000);

  }

  updateDatable() {
    setTimeout(function () {
      $(function () {
        location.reload();
      });
    }, 2000);
    //this.notificationInfoUpdate();
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
    this.lugar = array.id;
    //console.log(array);
  }




  optionSelected4(selectedVendor) {

    let array = JSON.parse(selectedVendor);
    this.supplierSelected = array;
    //console.log(this.supplierSelected);



  }

  optionSelected5(selectedVendor) {

    let array = JSON.parse(selectedVendor);
    this.beerSelected = array;
    //console.log(this.beerSelected);


  }

  addSupplier() {

    if (this.supplierSelected) {

      this.suppliersInO = Object.assign([{}], this.suppliersIn);
      //console.log(JSON.stringify(this.suppliersInO));



      for (let supplier of this.suppliersInO) {
        //console.log(supplier.denomi_comercial);
        if (supplier.denomi_comercial == this.supplierSelected.denomi_comercial) {
          alert('Ya eligio ese proveedor. Elija otro si desea');
          return null;
        }
      }

      this.suppliersIn.push({ id: this.supplierSelected.id, denomi_comercial: this.supplierSelected.denomi_comercial });
      //console.log(this.suppliersIn);
      alert('Proveedor añadido. Elija otro');
      $("#select2").val($("#select2 option:first").val());
      this.supplierSelected = 0;

      this._beerService.getBeerSupplier(this.suppliersIn).subscribe(
        response => {
          console.log(response);
          this.beersAvailable = response.beers;
          //console.log(this.beersAvailable);
        },
        error => {
          console.log(<any>error);

        }
      );

    }
    else {
      alert('Debe seleccionar primero un proveedor');
    }


  }

  addbeer() {

    if (this.beerSelected && $("#qty").val()) {

      this.beersInO = Object.assign([{}], this.beersIn);
      //console.log(JSON.stringify(this.beersInO));



      for (let beer of this.beersInO) {
        //console.log(beer.nombre);
        if (beer.nombre == this.beerSelected.nombre) {
          alert('Ya eligio esa cerveza. Elija otra');
          return null;
        }
      }

      this.beersIn.push({ id: this.beerSelected.id, nombre: this.beerSelected.nombre, cantidad_cervezas: $("#qty").val() });
      //console.log(this.beersIn);
      alert('Cervezar añadida. Elija otra si desea');
      $("#select3").val($("#select3 option:first").val());
      $("#qty").val('');
      this.beerSelected = 0;

    }
    else {
      alert('Debe seleccionar primero una cerveza');
    }


  }

  onSubmit(Form) {

    if (this.suppliersIn.length != 0 && this.beersIn.length != 0) {

      let data_event = {
        'nombre': $("#name").val(),
        'descripcion': $('#description').val(),
        'cantidad_entradas': $('#ticket').val(),
        'fecha': $('#date').val(),
        'lugar_id': this.lugar,
        'proveedores': this.suppliersIn,
        'cervezas': this.beersIn
      };

      console.log(data_event);
      console.log(JSON.stringify(data_event));

      //backend here
      /*this._crudService.registerEvent(data_event).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(<any>error);
        }
      );*/

      $("#eventModal").modal('hide');
      alert('Evento registrado');
      $('#CreateEventForm').trigger("reset");
    }
    else {
      alert('Informacion suministrada incompleta');
    }

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

  deleteSupplierIn(id) {
    console.log(id);

    //console.log(this.suppliersIn);

    for (let i = 0; i < this.suppliersIn.length; i++) {

      if(this.suppliersIn[i].id==id){
        this.suppliersIn.splice(i, 1);
      }
      console.log(this.suppliersIn);
    }



  }


  deleteBeerIn(id) {
    console.log(id);
    for (let i = 0; i < this.beersIn.length; i++) {

      if(this.beersIn[i].id==id){
        this.beersIn.splice(i, 1);
      }
      console.log(this.beersIn);
    }

  }

}
