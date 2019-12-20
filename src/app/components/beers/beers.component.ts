import { Component, OnInit, DoCheck } from '@angular/core';
import idiom from '../../idiom';
import { ServicioConTodoService } from '../../services/serviciocontodo.service'
import { Beer2 } from 'src/app/models/beer';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService} from 'angular2-notifications';
declare var $;


@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css'],
  providers: [ServicioConTodoService, AuthService, NotificationsService]
})
export class BeersComponent implements OnInit {
  public tipoc;
  public tipoc2;
  public beers;
  public data;
  public tipos;
  public tipos2;
  public tipod;
  public token;
  public identity;


  constructor(private _contodo: ServicioConTodoService, private _authService: AuthService, private _service: NotificationsService) { }

  ngOnInit() {

    this.token = this._authService.getToken();
    this.identity = this._authService.getIdentity();

    this._contodo.getTypes().subscribe(
      response => {
        this.tipos = response;
        this.tipos2 = response;
      },
      error => {
        console.log(<any>error);

      }
    );

    this._contodo.getdataBeer().subscribe(
      response => {
        this.beers = response.beers;
      },
      error => {
        console.log(<any>error);

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


    console.log(this.data);

  }



  openModal(beer) {


    $("#nameu").val(beer.nombre);
    $("#typeu").val(beer.type);
    $("#priceu").val(beer.precio_unitario);
    $("#editModal").modal('show');

  }


  update() {


    $("#editModal").modal('hide');


  }


  optionSelected3(selectedVendor) {
    let array = JSON.parse(selectedVendor);
    this.tipoc = array.nombre;

  }

  optionSelected4(selectedVendor) {
    let array = JSON.parse(selectedVendor);
    this.tipoc2 = array.nombre;

  }

  onSubmit(Form) {

    let nombre = $("#nombre").val();
    let tipod = this.tipoc;
    let precio = $("#precio").val();
    console.log(precio); console.log(nombre);
    let databeer = new Beer2(tipod, nombre, precio);

    console.log(JSON.stringify(databeer));
    this._contodo.registerCerveza(databeer, this.token).subscribe(
      response => {
        this.notificationSucess();
        this.notificationInfo();
        console.log('Se agrego');
        $("#beerModal").modal('hide');
      },
      error => {
        console.log('Algo fallo');
      }

    );

  }


  delete(id) {
    $("#confirmation").modal('hide');
    this._contodo.getdelete4(id, this.token).subscribe(
      response => {
        console.log('Se elimino');
        console.log(response);
        this.notificationBeerDeleted();
        this.updateDatable();
      },
      error => {
        console.log(<any>error);
        console.log('Fallo');
      }

    )
  }

  openModalDelete(){
    $("#confirmation").modal('show');
  }

  updateDatable() {
    setTimeout(function () {
      $(function () {
        location.reload();
      });
    }, 2000);
    this.notificationInfoUpdate();
  }
    

  notificationSucess(){
    this._service.success('Registro exitoso','Cerveza agregada correctamente',{
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  notificationInfo(){
    this._service.info('Informacion','Actualice la tabla cervezas para ver los cambios',{
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

  notificationBeerDeleted(){
    this._service.success('Registro borrado','Cerveza eliminada correctamente',{
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }


}
