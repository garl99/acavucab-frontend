import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService]
})
export class DashboardComponent implements OnInit, DoCheck {
  public identity;
  public view_profile;

  constructor(private _authService: AuthService, private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.identity = this._authService.getIdentity();
    this.view_profile = 0;

  }

  ngDoCheck() {
    this.profile();

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



}
