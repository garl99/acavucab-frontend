import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ReportService } from 'src/app/services/report.service';


declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService, NotificationsService, ReportService]
})
export class DashboardComponent implements OnInit, DoCheck {
  public identity;
  public view_profile;
  public role;
  public reporteA = "A";
  public reportToGenerate;


  constructor(private _authService: AuthService, private _router: Router,
    private _route: ActivatedRoute, private _service: NotificationsService, private _reportService:ReportService) {

  }


  ngDoCheck() {
    this.profile();
  }


  ngOnInit() {
    this.identity = this._authService.getIdentity();
    this.role = this.identity.rol;
    this.view_profile = 0;
    console.log(this.identity.rol);

  }

  action() {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  }




  profile() {
    this._route.params.subscribe(params => {

      let profile = +params['sure'];

      if (profile == 1) {
        this.view_profile = 1;
      }

    }
    );


  }

  openModal(report) {
    $("#ReporteModal").modal('show');
    this.reportToGenerate = report;
    console.log(this.reportToGenerate);

  }

  onSubmit(form) {
    console.log(this.reportToGenerate);
    let dataS = $('#datei').val();
    let dateE = $('#datef').val();
    console.log(dataS);
    console.log(dateE);

    let data = {
      'fecha_inicio': dataS,
      'fecha_fin': dateE
    };

    console.log(JSON.stringify(data));


    if (this.reportToGenerate == 'A') {
      console.log("entre");
      
      this._reportService.reportA(data).subscribe(
        response => {
          if (response.status == 'success') {
            this.notificationSucess();
            alert('Reporte generado');
            $("#ReporteModal").modal('show');
          }
          else {
            this.notificationError();
            alert('Error en generar reporte');
            $("#ReporteModal").modal('show');
          }
        },
        error => {
          console.log(<any>error);
          alert('Error en generar reporte');

        }
      );
    }


  }

  notificationSucess() {
    this._service.success('Reporte generado', 'operacion exitosa, retire su reporte', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  notificationError() {
    this._service.error('Error', 'No fue posible realizar esta acción. Intente más tarde', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }


}
