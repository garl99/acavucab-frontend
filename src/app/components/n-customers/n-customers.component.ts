import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import idiom from '../../idiom';
import { CustomersNService } from '../../services/n-customers.service';
declare var $;

@Component({
  selector: 'app-n-customers',
  templateUrl: './n-customers.component.html',
  styleUrls: ['./n-customers.component.css'],
  providers: [CustomersNService]
})
export class NCustomersComponent implements OnInit {

  public clientesn;
  public data: any = [
    {
      'name': 'Polar',
      'type': 'Ale',
      'price': '123'

    },

    {
      'name': 'Solera',
      'type': 'Lager',
      'price': '567'


    },
    {
      'name': 'Light',
      'type': 'Ale',
      'price': '321'
    },
    {
      'name': 'Polar',
      'type': 'Ale',
      'price': '123'

    },

    {
      'name': 'Solera',
      'type': 'Lager',
      'price': '567'


    },
    {
      'name': 'Light',
      'type': 'Ale',
      'price': '321'
    },
    {
      'name': 'Polar',
      'type': 'Ale',
      'price': '123'

    },

    {
      'name': 'Solera',
      'type': 'Lager',
      'price': '567'


    },
    {
      'name': 'Light',
      'type': 'Ale',
      'price': '321'
    }
  ];

  

  constructor(private _customersNService: CustomersNService) { }

  ngOnInit() {
    setTimeout(function () {      //Renderiza la tabla
      $(function () {
        $('#dataTable').DataTable({
          "pageLength": 8,
          "lengthMenu": [[8, 16, 24, -1], [8, 16, 24, "Todos"]],
          "language": idiom
        });
      });
    }, 0);

      this._customersNService.getCustomern().subscribe(
        response  =>  {
          console.log(response);
          
        },
        error =>  {
          console.log(<any>error);
        }
      );

    

  }

  openModal(beer) {   //Abrir modal para recoger datos que se van actualizar


    $("#nameu").val(beer.name);
    $("#typeu").val(beer.type);
    $("#priceu").val(beer.price);
    $("#editModal").modal('show');

  }


  update(){   //Actualizar registro
    this.data = [
      {
        'name': 'Gabriel',
        'type': 'Prueba',
        'price': '123'

      },

      {
        'name': 'Belga',
        'type': 'Lager',
        'price': '567'


      },
      {
        'name': 'Carmen',
        'type': 'Lager',
        'price': '321'
      },
      {
        'name': 'Polar',
        'type': 'Ale',
        'price': '123'

      },

      {
        'name': 'Solera',
        'type': 'Lager',
        'price': 'Pepsi'


      },
      {
        'name': 'Malta',
        'type': 'Ale',
        'price': '321'
      },
      {
        'name': 'Polar',
        'type': 'Ale',
        'price': '123'

      }
    ];

    $("#editModal").modal('hide');

   
  }


  create(){     //registro




  }

}
