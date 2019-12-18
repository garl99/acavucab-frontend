import { Component, OnInit } from '@angular/core';
import idiom from '../../idiom';
import {ServicioConTodoService} from '../../services/serviciocontodo.service'
import { Beer2 } from 'src/app/models/beer';
import { AuthService } from 'src/app/services/auth.service';
declare var $;


@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css'],
  providers: [ServicioConTodoService,AuthService]
})
export class BeersComponent implements OnInit {
  public tipoc;
  public beers;
  public data;
  public tipos;
  public tipod;
  public token;


  constructor(private _contodo:ServicioConTodoService,private _authService: AuthService) { }

  ngOnInit() {

    this._contodo.getTypes().subscribe(
      response =>{
        this.tipos=response;
      },
      error =>{
        console.log(<any>error);
        
      }
    );

    this._contodo.getdataBeer().subscribe(
      response =>{
        this.beers=response.beers;
      },
      error =>{
        console.log(<any>error);
        
      }
    );

    setTimeout(function () {
      $(function () {
        $('#dataTable').DataTable({
          "pageLength": 8,
          "lengthMenu": [[8, 16, 24, -1], [8, 16, 24, "Todos"]],
          "language": idiom
        });
      });
    }, 5000);

    
    console.log(this.data);

  }

  openModal(beer) {


    $("#nameu").val(beer.name);
    $("#typeu").val(beer.type);
    $("#priceu").val(beer.price);
    $("#editModal").modal('show');

  }


  update(){
    

    $("#editModal").modal('hide');

   
  }


  optionSelected3(selectedVendor) {
    let array = JSON.parse(selectedVendor);
    this.tipoc=array.nombre;
    
  }

  onSubmit(Form){

    let nombre=$("#nombre").val();
    let tipod=this.tipoc;
    let precio=$("#precio").val();
    console.log(precio);console.log(nombre);
    let databeer= new Beer2(tipod,nombre,precio);

    console.log(JSON.stringify(databeer));
    this._authService.getToken();
    this._contodo.registerCerveza(databeer,this.token).subscribe(
      response =>{
        console.log('Se agrego');
      },
      error =>{
        console.log('Algo fallo');
      }

    );
    
  }

  
  delete(id){
    this._contodo.getdelete4(id).subscribe(
      response  =>{
        console.log('Se elimino');
      },
      error=>{
        console.log('Fallo');
      } 

    )}

}
