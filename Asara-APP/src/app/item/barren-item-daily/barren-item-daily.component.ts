import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { BarrenItem } from 'src/models/barrenItem';
import { ExtraExpenses } from 'src/models/extraExpenses';
import { BarrenService } from 'src/service/barren.service';

@Component({
  selector: 'app-barren-item-daily',
  templateUrl: './barren-item-daily.component.html',
  styleUrls: ['./barren-item-daily.component.scss']
})
export class BarrenItemDailyComponent implements OnInit {
  public gridOptions: GridOptions;
  public columnDefs: any[];
  public rowData: BarrenItem[];
  formDay: FormGroup;
  exExpenses: ExtraExpenses[] = [];
  infoBarren: { earn: number; cost: number; extraExpenses: number; };
  openDisplay = false;
  expenses = 0;
  constructor(private route: ActivatedRoute, private barrenService: BarrenService) {
    this.route.data.subscribe(
      d => {
        this.rowData = d.barrenItems;
        this.exExpenses = d.expenses;
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
              return 'مبيعات';
            }
            if (data.value === '0') {
              return 'مُشتريات';
            }
            return null;
          }
        }
      },
      { field: 'itemId', headerName: 'كود الصنف', type: 'rightAligned' },
      {
        hide: true, field: 'name', headerName: 'اسم الصنف', type: 'rightAligned', rowGroup: true, filter: 'agTextColumnFilter'
      },
      {
        field: 'quentity', headerName: 'الكمية', type: 'rightAligned',
        aggFunc: params => {
          let sum = 0;
          params.values.forEach(value => sum += value);
          return sum;
        }
      },

      { field: 'price', headerName: 'السعر', type: 'rightAligned' },
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
    for (const e of this.exExpenses) {
      this.expenses += e.paid;
    }
    this.formDay = new FormGroup({
      day: new FormControl('', [Validators.required])
    });
  }
  getInfo() {
    let sumEarn = 0;
    let sumCost = 0;
    for (const item of this.rowData) {
      if (item.type === 1) {
        sumEarn += item.quentity * item.price;
      }
      if (item.type === 0) {
        sumCost += item.quentity * item.price;
      }
    }
    return { sumCost, sumEarn };
  }
  showDisplayBarren() {
      const sum = this.getInfo();
      this.infoBarren = {
        earn: sum.sumEarn,
        cost: sum.sumCost,
        extraExpenses: this.expenses
      }
      this.openDisplay = true;
  }
  getDayData() {
    const date = new Date(Date.parse(this.formDay.get('day').value));
    if (this.formDay.valid) {
      this.barrenService.getBarrenDaily(this.formDay.get('day').value).subscribe(d => {
        this.rowData = d;
      }, e => {
        console.log(e);
      });
      this.barrenService.getExtraExpensesByDay(date.toLocaleDateString()).subscribe(d => {
        this.exExpenses = d;
      }, e => {
        console.log(e);
      });

    }
  }
  openDisplayBarren(stat) {
    this.openDisplay = stat;
  }
}
