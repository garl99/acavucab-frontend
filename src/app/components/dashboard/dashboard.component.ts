import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService]
})
export class DashboardComponent implements OnInit {
  public identity;
  public role;

 

  constructor(private _authService: AuthService) {
    this.identity = this._authService.getIdentity();
    this.role = this.identity.rol;
   }
  

  ngOnInit() {
    this.identity = this._authService.getIdentity();
    console.log(this.identity.rol);
  
  }

  action() {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  }

  
  



}
