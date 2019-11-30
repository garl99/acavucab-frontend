import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import idiom from '../../idiom';
declare var $;

@Component({
  selector: 'app-d-orders',
  templateUrl: './d-orders.component.html',
  styleUrls: ['./d-orders.component.css']
})
export class DOrdersComponent implements OnInit {

  @ViewChild('dataTable', { static: true }) table: ElementRef;
  dataTable: any;

  constructor() { }

  ngOnInit() {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable({
      pageLength : 7,
      "lengthChange": false,
      "language": idiom 
    });
  }

}


