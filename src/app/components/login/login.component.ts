import { Component, OnInit } from '@angular/core';
import { Auth } from '../../models/auth';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, NotificationsService]
})
export class LoginComponent implements OnInit {

  public auth: Auth;
  public status: string;
  public identity;
  public token;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _service: NotificationsService
  ) {
    this.auth = new Auth('', '');
  }

  ngOnInit() {
    this.logout();
  }

  onSubmit(form) {
    
    console.log(this.auth);
    this._authService.signup(this.auth).subscribe(
      response => {
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;
          
          this.loginSuccess();
          this._authService.signup(this.auth, true).subscribe(
            response => {
              
              this.identity = response;
              
              if(this.status=='success'){
               
                console.log('entro');
              }
              //console.log(this.identity);
              //console.log(this.token);

              //PERSISTIR DATOS DE USUARIO
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              //REDICCIONAR A INICIO
            
              this._router.navigate(['dashboard']);
              

            },
            error => {
              this.status = 'error';
              console.log(<any>error);
              this.loginError();
            }

          );

        }

        else {
          this.status = 'error';
          console.log('Datos incorrectos');
          this.loginError();

        }

      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }

    );

  }

  logout() {


    this._route.params.subscribe(params => {

      let logout = +params['sure'];


      if (logout == 1) {

        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        this.token = null;
        this.identity = null;

        //REDICCIONAR A INICIO

        this._router.navigate(['home']);

      }

    }
    );

  }

  loginSuccess(){
    this._service.success('Datos correctos','Accediendo al sistema. Por favor, espere....',{
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  loginError(){
    this._service.error('Datos incorrectos','Por favor, intente de nuevo',{
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

}
