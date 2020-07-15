import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  columnDefs = [
    { headerName: 'S.No', field: 'sno', sortable: false, filter: false },
    { headerName: 'Make', field: 'make', sortable: true, filter: true },
    { headerName: 'Model', field: 'model', sortable: true, filter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true }
  ];

  rowData: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.rowData = this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData.json')
      .pipe(
        map((itm: any[], index) => {
          console.log(itm);
          itm = itm.map((data, index) => {
            return {
              ...data,
              "sno": (index + 1)
            }
          })
          return itm;
        })
      )
  }

  onFirstDataRendered(params) {
    //params.api.sizeColumnsToFit();
    params.api.sizeColumnsToFit();
  }
}