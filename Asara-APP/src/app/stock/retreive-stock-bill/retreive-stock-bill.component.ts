import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { Bill } from 'src/models/bill';
import { StockBill } from 'src/models/stockBill';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/service/alterify.service';
import { AuthService } from 'src/service/auth.service';
import { BillService } from 'src/service/bill.service';
import { StockService } from 'src/service/stock.service';

@Component({
  selector: 'app-retreive-stock-bill',
  templateUrl: './retreive-stock-bill.component.html',
  styleUrls: ['./retreive-stock-bill.component.scss']
})
export class RetreiveStockBillComponent implements OnInit {
  public gridOptions: GridOptions;
  @Input() rowData: StockBill[];
  public columnDefs: any[];
  @Output() showRetreive = new EventEmitter<boolean>();
  @Output() DeletedStockBills = new EventEmitter<StockBill[]>();
  getRowNodeId: (data: any) => any;
  type: number;
  user: User;
  constructor(private authService: AuthService, private alertify: AlertifyService,
              private stockService: StockService, private route: ActivatedRoute) {
  }
  @HostListener('window:click', ['$event.target'])
   hide(event){
    if (event.id === 'myModal') {
      this.showEvent(false);
    }
  }
  ngOnInit() {
    this.route.params.subscribe(d => {
      this.type = d.id;
    });
    if (this.rowData){
      this.rowData = this.rowData.filter(p => this.type == p.type).reverse();
    }
    this.user = this.authService.currentUserValue;
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

    } as GridOptions);
    this.columnDefs = [
      {
        field: 'id', headerName: 'عرض', type: 'rightAligned', cellRenderer: () => {
          return `<button class ="btn btn-danger">حذف </button>`;
        },
        onCellClicked: p => {
          this.alertify.confirm('هل انت متأكد من حذفه؟', () => {
            this.stockService.deleteStockBill(p.data.id).subscribe(d => {
              if (d.isNotEnough){
                this.alertify.error('رجاءًا قُمْ بمراجعة الكمية');
              }
              if (d.isDeleted){
                this.rowData = this.rowData.filter(i => i.id != p.data.id);
                localStorage.setItem('reteiveStockList', JSON.stringify(this.rowData));
                this.gridOptions.api.setRowData(this.rowData);
                this.alertify.success('تم حذف الفاتورة');
                this.setDeletedEvent(this.rowData);
              }
            });
          });
        }
      },
      { field: 'id', headerName: 'الكود', type: 'rightAligned', filter: true },
      { field: 'worker', headerName: 'العامل', type: 'rightAligned' },
      {field: 'createdAt', headerName: 'وقت التسجيل', type: 'rightAligned',
        cellRenderer: (data) => {
          if (data.value) {
            return moment(data.value).format('h:mm a');
          }
        }, sort: true
      }
    ];
  }
  showEvent(t: boolean){
    this.showRetreive.emit(t);
  }
  setDeletedEvent(stockBills: StockBill[]){
    this.DeletedStockBills.emit(stockBills);
  }
}
