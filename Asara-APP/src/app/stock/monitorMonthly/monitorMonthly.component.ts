import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { MonitorItem } from 'src/models/monitorItem';
import { MonitorService } from 'src/service/monitor.service';

@Component({
  selector: 'app-monitor-monthly',
  templateUrl: './monitorMonthly.component.html',
  styleUrls: ['./monitorMonthly.component.scss']
})
export class MonitorMonthlyComponent implements OnInit {
  public gridOptions: GridOptions;
  public columnDefs: any[];
  public rowData: MonitorItem[];
  formBarren: FormGroup;
  formDay: FormGroup;
  constructor(private route: ActivatedRoute, private monitorService: MonitorService) {
    this.route.data.subscribe(
      d => {
        this.rowData = d.monitorItems;
      }, e => {
        console.log(e);
      }
    );
    this.gridOptions = ({
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      defaultColDef: {
        flex: 1,
        minWidth: 120,
        sortable: true,
        resizable: true,
      },
      autoGroupColumnDef: {
        minWidth: 100,
      },
      groupMultiAutoColumn: true,
      enableRangeSelection: true,
      animateRows: true,
      aggFuncs: {
         Sum: params => {
          let sum = 0;
          params.values.forEach(value => sum += value);
          return sum;
        }
      },
      pagination: true,
      paginationAutoPageSize: true
    } as GridOptions);
    this.columnDefs = [
      {
        hide: true,
        headerName: 'نوع الفاتورة',
        field: 'type',
        rowGroup: true,
        type: 'rightAligned',
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
          innerRenderer: data => {
            if (data.value === '1') {
              return 'مَسحوبات';
            }
            if (data.value === '0') {
              return 'مُدخلات';
            }
            return null;
          }
        }
      },
      { field: 'employeeName', headerName: 'اسم الموظف', type: 'rightAligned' },
      {
        hide: true, field: 'itemName', headerName: 'اسم الصنف', type: 'rightAligned', rowGroup: true, filter: 'agTextColumnFilter'
      },
      { field: 'quentity', headerName: 'الكمية', type: 'rightAligned',
        aggFunc:params => {
          let sum = 0;
          params.values.forEach(value => sum += value);
          return sum;
        } },

      { field: 'worker', headerName: 'عامل', type: 'rightAligned' },
      {
        field: 'createdAt', headerName: 'وقت التسجيل', type: 'rightAligned',
        cellRenderer: (data) => {
          if (data.value) {
            return moment(data.value).format('Do, h:mm a');
          }
        }
      }
    ];
  }
  ngOnInit() {
    this.formDay = new FormGroup({
      day: new FormControl('', [Validators.required])
    });
  }
  getDayData(){
    if (this.formDay.valid){
      const date = new Date(Date.parse(this.formDay.get('day').value));
      this.monitorService.getMonitorMonthly({
        month: date.getMonth() + 1,
        year: date.getFullYear()
      }).subscribe(d => {
        this.rowData = d;
      }, e => {
        console.log(e);
      });
    }
  }
}
