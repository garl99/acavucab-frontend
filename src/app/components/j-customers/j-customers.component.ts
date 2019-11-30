import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import idiom from '../../idiom';
declare var $;

@Component({
  selector: 'app-j-customers',
  templateUrl: './j-customers.component.html',
  styleUrls: ['./j-customers.component.css']
})
export class JCustomersComponent implements OnInit {
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
