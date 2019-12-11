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

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.identity=this._authService.getIdentity();
  }

  action(){
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  }

}
