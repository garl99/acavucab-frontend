import { Component, OnInit } from '@angular/core';
import idiom from '../../idiom';
import { CustomersNService } from '../../services/n-customers.service';
import { AuthService } from '../../services/auth.service';
import { PlaceService } from '../../services/places.service';
import { CustomersN } from '../../models/n-customers';
import { CRUDService } from 'src/app/services/crud.service';
declare var $;

@Component({
  selector: 'app-n-customers',
  templateUrl: './n-customers.component.html',
  styleUrls: ['./n-customers.component.css'],
  providers: [CustomersNService, AuthService, PlaceService, CRUDService]
})
export class NCustomersComponent implements OnInit {

  public states;
  public munis;
  public parrs;
  public clientesn;
  public identity;
  public lugar;
  

  constructor(private _customersNService: CustomersNService,
    private _placeService: PlaceService,
    private _authService: AuthService,private _crudService: CRUDService) {
   }

  ngOnInit() {
    this.identity = this._authService.getIdentity();
    this.loadStates();
    this._customersNService.getCustomern().subscribe(
      response  =>  {
        console.log(response);
        this.clientesn=response;
        
      },
      error =>  {
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

  openModal(beer) {   //Abrir modal para recoger datos que se van actualizar


    $("#nameu").val(beer.name);
    $("#typeu").val(beer.type);
    $("#priceu").val(beer.price);
    $("#editModal").modal('show');

  }


  update(){   //Actualizar registro

    $("#editModal").modal('hide');

   
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

  onSubmit(Form){
    let rif=($('#rif').val());
    let cedula=($('#cedula').val());
    let primer_nombre=($('#primer_nombre').val());
    let segundo_nombre=($('#segundo_nombre').val());
    let primer_apellido=($('#primer_apellido').val());
    let segundo_apellido=($('#segundo_apellido').val());
    let clave_area=($('#clave_area').val());
    let numero=($('#numero').val());
    let correo=($('#correo').val());
    let lugar=this.lugar;
    let direccion_fisica=($('#dir').val());

    let data=new CustomersN(rif,cedula,primer_nombre,segundo_nombre,primer_apellido,
      segundo_apellido,lugar,direccion_fisica,correo,clave_area,numero);
  
      console.log(JSON.stringify(data));


      this._crudService.registerNatural(data).subscribe(
        response  =>{
          console.log(response);
          
          console.log('Se agrego');
        },
        error=>{
          console.log(<any>error);
          console.log('Fallo');
        }
      );
      
      $('#modal').modal('hide');
    }


    delete(id){
      this._crudService.getdelete1(id).subscribe(
        response  =>{
          console.log(response);
          
          console.log('Se elimino');
        },
        error=>{
          console.log(<any>error);
          console.log('Fallo');
        }
  
      )}
  
}
