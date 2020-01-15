import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit, DoCheck {
  public identity;
  public token;

  constructor(private _authIdentity: AuthService) {
    this.load();
  }

  ngOnInit() {
    console.log('ok');
    console.log(this.identity);
  }

  ngDoCheck() {
    this.load();
  }

  load() {
    this.identity = this._authIdentity.getIdentity();
    this.token = this._authIdentity.getToken();
  }

}
