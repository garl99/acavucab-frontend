import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-o-suppliers',
  templateUrl: './o-suppliers.component.html',
  styleUrls: ['./o-suppliers.component.css'],
  providers: [AuthService, StoreService]
})
export class OSuppliersComponent implements OnInit {
  public identity;
  public role;
  public beersToBuy;
  public bandera;
  constructor(private _authService: AuthService, private _storeService: StoreService) { }

  ngOnInit() {
    this.identity = this._authService.getIdentity();
    this.role = this.identity.rol;

    this._storeService.CheckStock(this.identity.id).subscribe(
      response =>{
        this.beersToBuy=response.cervezas;
        this.bandera=response.bandera;
        console.log(this.beersToBuy);
        
      },
      error =>{console.log(<any>error);
      }
    );

  }

}
