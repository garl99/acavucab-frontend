import { Component, OnInit } from '@angular/core';
import idiom from '../../idiom';
declare var $;


@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
    setTimeout(function () {
      $(function () {
        $('#dataTable').DataTable({
          "pageLength": 8,
          "lengthMenu": [[8, 16, 24, -1], [8, 16, 24, "Todos"]],
          "language": idiom
        });
      });
    }, 0);

    
    console.log(this.data);

  }

  openModal(beer) {


    $("#nameu").val(beer.name);
    $("#typeu").val(beer.type);
    $("#priceu").val(beer.price);
    $("#editModal").modal('show');

  }


  update(){
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

}
