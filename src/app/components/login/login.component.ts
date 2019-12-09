import { Component, OnInit } from '@angular/core';
import { Auth } from '../../models/auth';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public auth: Auth;
  public status: string;
  public identity;
  public token;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.auth = new Auth('', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._authService.signup(this.auth).subscribe(
      response => {
        if(response.status!='error'){
          this.status = 'success';
          this.token=response;

          this._authService.signup(this.auth,true).subscribe(
            response => {
              this.identity=response;
              //console.log(this.identity);
              //console.log(this.token);

              //PERSISTIR DATOS DE USUARIO
              localStorage.setItem('token',this.token);
              localStorage.setItem('identity',JSON.stringify(this.identity));

              //REDICCIONAR A INICIO

              this._router.navigate(['dashboard']);

            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
      
          );



        }

        else{
          this.status = 'error';
          console.log('Datos incorrectos');
        }
        
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }

    );

  }

}
