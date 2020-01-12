import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CustomersNService } from '../../services/n-customers.service';
import { CRUDService } from 'src/app/services/crud.service';
import idiom from '../../idiom';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NotificationsService} from 'angular2-notifications';

declare var $;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [CustomersNService,CRUDService]
})

export class UsersComponent implements OnInit {

  public users;
  public service;
  public roles;
  
    
  constructor(private _userService: UserService, private _customersNService: CustomersNService,
            private _crudService: CRUDService,  private _service: NotificationsService){}

  ngOnInit() {

    this.loadRoles();
    this._customersNService.getUsers().subscribe(
      response => {
        console.log(response);
        this.users = response;
        

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

  updateDatable() {
    setTimeout(function () {
      $(function () {
        location.reload();
      });
    }, 2000);
    this.notificationInfoUpdate();
  }

  onSubmit(Form){

    let correo=($('#correo').val());
    let contrasena=($('#contraseña').val());
    let rol=($('#rol').val());

    let data ={correo, contrasena, rol};

    console.log(correo);
    console.log(contrasena);
    console.log(data);
    
  
      console.log(JSON.stringify(data));
      
      this._crudService.registerUser(data).subscribe(
        response  =>{
          console.log('Se agrego');
        },
        error=>{
          console.log('Fallo');
        }
      );
      $('#modal').modal('hide');

  }

  loadRoles() {

    this._customersNService.getRoles().subscribe(     //validar aqui

      response => {
        this.roles = response;
        console.log('cargando Roles');
        console.log(this.roles);

      },

      error => {
        console.log(<any>error);

      }

    );
  }

  openModalDelete(id) {
    $("#confirmation" + id).modal('show');
  }

  delete(id) {
    console.log(id);

    $("#confirmation" + id).modal('hide');

   this._crudService.delete6(id).subscribe(
      response => {
        console.log('Se elimino');
        console.log(response);
        this.notificationUserDeleted();
        this.updateDatable();
      },
      error => {
        console.log(<any>error);
        console.log('Fallo');
        this.notificationError();
      }

    );
  }

  notificationUserDeleted(){
    this._service.success('Registro borrado','Usuario eliminado correctamente',{
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  notificationError(){
    this._service.info('Error','No fue posible realizar esta acción. Intente más tarde',{
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  notificationInfoUpdate(){
    this._service.info('Actualizando registros','Por favor, espere',{
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  update(Form, user) {

    let id = user.id;
    let correo = $("#correo" + user.id).val();
    //let rol = $("#rol" + user.id).val();

    let data;
    
    data = {correo};
    
    console.log(data);
    
    this._crudService.updateUser(id, data).subscribe(
      response => {
        console.log(response);
        this.notificationSucess();
        this.updateDatable();

      },
      error => {
        console.log(<any>error);
        this.notificationError();
      }
    );



    console.log(data);


    $("#editModal" + user.id).modal('hide');


  }

  notificationSucess(){
    this._service.success('Edición exitosa','usuario editado correctamente',{
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  openModal(user) {

    $("#correo" + user.id).val(user.correo);
    $("#rol" + user.id).val(user.rol);
    $("#editModal" + user.id).modal('show');

  }

}
