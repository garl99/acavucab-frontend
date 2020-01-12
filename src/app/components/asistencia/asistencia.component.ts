import { Component, OnInit } from '@angular/core';
import { AsistenceService } from 'src/app/services/asistence.service';
import { NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css'],
  providers: [AsistenceService]
})


export class AsistenciaComponent implements OnInit {

  public asistence;
  public service
    
  constructor(private _asistenceService: AsistenceService,  private _service: NotificationsService){}

  ngOnInit() {
    this._asistenceService.getTxt().subscribe(
      response => {
        //console.log(response);
        this.asistence = response.asistence;
        this.notificationSucess();
        //console.log(this.events);
        //console.log(response.lugares);


      },
      error => {
        console.log(<any>error);
        console.log('Algo fallo');

      }
    );
  }

  notificationSucess(){
    this._service.success('Proceso completo',' Se ha registrado la asistencia correctamente',{
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }


}
