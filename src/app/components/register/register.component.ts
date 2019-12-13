import { Component, OnInit } from '@angular/core';
import {Cliente_natural} from '../../models/cliente_natural';
import { Correo } from 'src/app/models/correo';
import { Telefono } from 'src/app/models/telefono';
import {ClienteNaturalService} from '../../services/cliente_natural.services';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ClienteNaturalService]
})
export class RegisterComponent implements OnInit {
  public cliente_natural: Cliente_natural;
  public correo: Correo;
  public telefono: Telefono;
  public status: string;

  constructor(
    private _clienteNaturalService: ClienteNaturalService
  ) {
    this.cliente_natural = new Cliente_natural(1, 0, 0, 0, '', '', '', '', 0);
    this.correo = new Correo('', 0, 0, 0, 0);
    this.telefono = new Telefono(0, 0, 0, 0, 0);
   }

  ngOnInit() {
    console.log('FUNCIONA');
  }

  onSubmit(form){
    this._clienteNaturalService.register(this.cliente_natural, this.correo, this.telefono).subscribe(
      response=>{

        if(response.status ==  "success"){
          this.status = response.status;
          form.reset();

      }else{
        this.status = "error";
      }
      error=> {
        console.log(<any>error);
        this.status = "error";
      }
    }
    );
  }

}
