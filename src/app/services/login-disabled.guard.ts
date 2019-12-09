import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()

export class LoginDisabled implements CanActivate {

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) {

    }


    canActivate() {

        let identity = this._authService.getIdentity();

        if (identity) {
            this._router.navigate(['/home']);
            return false;

        }
        else {
            return true;
        }


    }



}

