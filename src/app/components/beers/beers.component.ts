import { Component, OnInit } from '@angular/core';
import idiom from '../../idiom';
declare var $;


@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {
  data: any;

  constructor() { }

  ngOnInit() {
    setTimeout(function () {
      $(function () {
        $('#dataTable').DataTable({
          "pageLength": 8,
          "lengthMenu": [ [8, 16, 24, -1], [8, 16, 24, "Todos"] ],
          "language": idiom
        });
      });
    }, 0);

    this.data = [
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
    console.log(this.data);

  }



  openModal(beer) {


    $("#nameu").val(beer.name);
    $("#typeu").val(beer.type);
    $("#priceu").val(beer.price);
    $("#editModal").modal('show');
  }

}
