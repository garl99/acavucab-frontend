import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import idiom from '../../idiom';
declare var $;

@Component({
  selector: 'app-i-orders',
  templateUrl: './i-orders.component.html',
  styleUrls: ['./i-orders.component.css']
})
export class IOrdersComponent implements OnInit {
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
