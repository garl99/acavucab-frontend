import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import idiom from 'src/app/idiom';

@Component({
  selector: 'app-orders-suppliers',
  templateUrl: './orders-suppliers.component.html',
  styleUrls: ['./orders-suppliers.component.css'],
  providers: [AuthService, SuppliersService]
})
export class OrdersSuppliersComponent implements OnInit {
  public identity;
  public orders;

  constructor(private _authService: AuthService, private _supplierService: SuppliersService) { }

  ngOnInit() {
    this.identity = this._authService.getIdentity();

    this._supplierService.orders().subscribe(
      response => {
        this.orders = response;
        console.log(this.orders);
      },
      error => {
        console.log(<any>error);
      }
    );

    setTimeout(function () {
      $(function () {
        $('#dataTable').DataTable({
          "destroy": true,
          "pageLength": 8,
          "lengthMenu": [[8, 16, 24, -1], [8, 16, 24, "Todos"]],
          "language": idiom
        });
      });
    }, 3000);
  }

  pay(id) {
    $("#pay" + id).prop('disabled', true);
    $("#receive" + id).prop('disabled', false);
    $("#cancel" + id).prop('disabled', true);

    let data = {
      'id': id,
      'tipo': 1
    };

    console.log(JSON.stringify(data));


    
    this._supplierService.changeStatus(data).subscribe(
      response => {
        console.log(response);
        alert("Status cambiado. Actualizando...");
        location.reload();

      },
      error => {
        console.log(<any>error);

      }
    );



  }

  receive(id) {
    $("#receive" + id).prop('disabled', true);
    $("#cancel" + id).prop('disabled', true);

    let data = {
      'id': id,
      'tipo': 2
    };

    this._supplierService.changeStatus(data).subscribe(
      response => {
        console.log(response);
        alert("Status cambiado. Actualizando...");
        location.reload();

      },
      error => {
        console.log(<any>error);

      }
    );

  }

  cancel(id) {
    $("#cancel" + id).prop('disabled', true);
    $("#pay" + id).prop('disabled', true);
    $("#receive" + id).prop('disabled', true);

    let data = {
      'id': id,
      'tipo': 3
    };

    this._supplierService.changeStatus(data).subscribe(
      response => {
        console.log(response);
        alert("Status cambiado. Actualizando...");
        location.reload();

      },
      error => {
        console.log(<any>error);

      }
    );

  }
}
