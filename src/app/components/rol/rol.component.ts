import { Component, OnInit } from '@angular/core';
import { RolService } from '../../services/rol.service';
import idiom from '../../idiom';
import { CRUDService } from 'src/app/services/crud.service';
import { NotificationsService } from 'angular2-notifications';
import { Rol } from 'src/app/models/rol';
import { RolP } from 'src/app/models/rol';

declare var $;

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
  providers:[RolService]
})



export class RolComponent implements OnInit {

  public roles;
  public service;
  public permissionSelected;
  public permissionInO: any[];
  public permissionIn = Array();
  public permissions;
 

  constructor(private _RolService: RolService, private _crudService: CRUDService, private _service: NotificationsService) { }

  ngOnInit() {
    
    this._RolService.getPermisos().subscribe(
      response => {
        this.permissions = response;
        console.log('cargando Permisos');
        console.log(this.permissions);

      },

      error => {
        console.log(<any>error);

      }
    );
    
    this._RolService.getRoles().subscribe(
      response => {
        this.roles = response;
        console.log('cargando Roles');
        console.log(this.roles);

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

  optionSelected4(selectedVendor) {

    let array = JSON.parse(selectedVendor);
    this.permissionSelected = array;
    //console.log(this.supplierSelected);

  }

  
  addPermission(){
    
    if (this.permissionSelected) {

      this.permissionInO = Object.assign([{}], this.permissionIn);
      //console.log(JSON.stringify(this.suppliersInO));



      for (let permission of this.permissionInO) {
        //console.log(supplier.denomi_comercial);
        if (permission.nombre == this.permissionSelected.nombre) {
          alert('Ya eligio ese proveedor. Elija otro si desea');
          return null;
        }
      }

      this.permissionIn.push({ id: this.permissionSelected.id, nombre: this.permissionSelected.nombre });
      console.log(JSON.stringify(this.permissionIn));
      alert('Permiso añadido. Elija otro');
      $("#select2").val($("#select2 option:first").val());
      this.permissionSelected = 0;

     /* this._beerService.getBeerSupplier(this.suppliersIn).subscribe(
        response => {
          console.log(response);
          this.beersAvailable = response.beers;
          //console.log(this.beersAvailable);
        },
        error => {
          console.log(<any>error);

        }
      );*/

    }
    else {
      alert('Debe seleccionar un permiso');
    }

  }

  deletePermissionIn(id) {
    console.log(id);

    //console.log(this.suppliersIn);

    for (let i = 0; i < this.permissionIn.length; i++) {

      if (this.permissionIn[i].id == id) {
        this.permissionIn.splice(i, 1);
      }
      console.log(this.permissionIn);
    }

  }

  onSubmit(Form){

    if (this.permissionIn.length != 0) {

      let nombre = $("#name").val();

      let data_rol = new RolP(nombre, this.permissionIn);

      console.log(JSON.stringify(data_rol));
      console.log(data_rol);
      //console.log(this.beersIn);

      this._crudService.registerRol(data_rol).subscribe(

        response => {
          console.log('Se agrego');
          $("#rolModal").modal('hide');
          this.permissionIn = [];
          $('#CreateRolForm').trigger("reset");
          this.notificationSucess();
          this.updateDatable();
        },
        error => {
          console.log(<any>error);
          $("#rolModal").modal('hide');
          this.notificationError();
        }
      );

    }
    else {
      alert('Informacion suministrada incompleta');
    }
  }

  notificationSucess() {
    this._service.success('Registro exitoso', 'Rol agregado correctamente', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  updateDatable() {
    setTimeout(function () {
      $(function () {
        location.reload();
      });
    }, 2000);
    this.notificationInfoUpdate();
  }

  notificationInfoUpdate() {
    this._service.info('Actualizando registros', 'Por favor, espere', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  notificationError() {
    this._service.info('Error', 'No fue posible realizar esta acción. Intente más tarde', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }


}
