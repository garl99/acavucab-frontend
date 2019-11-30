import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import idiom from '../../idiom';
declare var $;

@Component({
  selector: 'app-n-customers',
  templateUrl: './n-customers.component.html',
  styleUrls: ['./n-customers.component.css']
})
export class NCustomersComponent implements OnInit {
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
