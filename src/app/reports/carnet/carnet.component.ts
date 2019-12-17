import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { global} from '../../services/global';


@Component({
  selector: 'app-carnet',
  templateUrl: './carnet.component.html',
  styleUrls: ['./carnet.component.css'],
  providers: [AuthService]
})
export class CarnetComponent implements OnInit {
  public data_carnet;
  public identity;
  public url;

  constructor(private _authService: AuthService, 
              private _router: Router, 
              private _activatedRoute: ActivatedRoute) { 
                this.url= global.url;
              }

  ngOnInit() {
    this.getDataCarnet();
  
  }


  getDataCarnet(){
    this.identity=this._authService.getIdentity();

    
    
    this._authService.getDataCarnet(this.identity.id,this.identity.rol).subscribe(    //Validar aca
      response=>{
        this.data_carnet=response.data_carnet;
      },
      error=>{
        console.log(<any>error);
      }
    );



  }




}
