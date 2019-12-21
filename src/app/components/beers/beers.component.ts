import { Component, OnInit, DoCheck } from '@angular/core';
import idiom from '../../idiom';
import { CRUDService} from '../../services/crud.service';
import { Beer2 } from 'src/app/models/beer';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService} from 'angular2-notifications';
import { BeerService } from 'src/app/services/beer.service';
declare var $;


@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css'],
  providers: [CRUDService, AuthService, NotificationsService, BeerService]
})
export class BeersComponent implements OnInit {
  public typeBeerSelected;
  public typeBeerSelected2;
  public beers;
  public typeBeerOptions;
  public typeBeerOptions2;
  public typeBeerData;
  public token;
  public identity;
  public typeSelected=[{
      nombre: ''
   }
  ];



  constructor(private _beerService:BeerService, private _crudService: CRUDService, private _authService: AuthService, private _service: NotificationsService) { }

  ngOnInit() {
        
    this.token = this._authService.getToken();
    this.identity = this._authService.getIdentity();

    this._beerService.getTypes().subscribe(
      response => {
        this.typeBeerOptions = response;
        this.typeBeerOptions2 = response;
      },
      error => {
        console.log(<any>error);

      }
    );

    this._beerService.getdataBeer().subscribe(
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


  }



  openModal(beer) {

     this.typeSelected=[{
        nombre:  beer.tipoc
        }
    ];
    $("#nameu"+beer.id).val(beer.nombre);
    $("#priceu"+beer.id).val(beer.precio_unitario);
    $("#editModal"+beer.id).modal('show');

  }


  update(Form,beer) {

    let id=beer.id;
    let nameu=$("#nameu"+beer.id).val();
    let priceu=$("#priceu"+beer.id).val();
  
    if(!this.typeBeerSelected2){
      this.typeBeerSelected2=this.typeSelected[0].nombre;
    }
    let databeer = new Beer2(this.typeBeerSelected2, nameu, priceu);

    this._crudService.updateBeer(id,this.token,databeer).subscribe(
      response => {
        console.log(response);
        this.notificationSucess2();
        this.updateDatable();

      },
      error  => {
        console.log(<any>error);
        this.notificationBeerError();
      }
    );



    console.log(databeer);
    
    
    $("#editModal"+beer.id).modal('hide');


  }


  optionSelected3(selectedVendor) {
    let array = JSON.parse(selectedVendor);
    this.typeBeerSelected = array.nombre;

  }

  optionSelected4(selectedVendor) {
    
    let array = JSON.parse(selectedVendor);
    this.typeBeerSelected2 = array.nombre;

  }

  onSubmit(Form) {

    let nombre = $("#nombre").val();
    let typeBeerData = this.typeBeerSelected;
    let precio = $("#precio").val();
    console.log(precio); console.log(nombre);
    let databeer = new Beer2(typeBeerData, nombre, precio);

    console.log(JSON.stringify(databeer));
    this._crudService.registerCerveza(databeer, this.token).subscribe(
      response => {
        this.notificationSucess();
        this.updateDatable();
        console.log('Se agrego');
        $("#beerModal").modal('hide');
      },
      error => {
        console.log('Algo fallo');
      }

    );

  }


  delete(id) {
    console.log(id);
    
    $("#confirmation"+id).modal('hide');
    this._crudService.getdelete4(id, this.token).subscribe(
      response => {
        console.log('Se elimino');
        console.log(response);
        this.notificationBeerDeleted();
        this.updateDatable();
      },
      error => {
        console.log(<any>error);
        this.notificationBeerInfo();
        console.log('Fallo');
      }

    )
  }

  openModalDelete(id){
    $("#confirmation"+id).modal('show');
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

  notificationSucess2(){
    this._service.success('Edición exitosa','Cerveza editada correctamente',{
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

  notificationBeerInfo(){
    this._service.info('Info','La información de esta cerveza es requerida',{
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  notificationBeerError(){
    this._service.error('Error','No puede modificar/borrar una cerveza que no le pertenece',{
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }


}
