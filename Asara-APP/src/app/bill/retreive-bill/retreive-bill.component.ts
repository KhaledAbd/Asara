import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { Bill } from 'src/models/bill';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/service/alterify.service';
import { AuthService } from 'src/service/auth.service';
import { BillService } from 'src/service/bill.service';

@Component({
  selector: 'app-retreive-bill',
  templateUrl: './retreive-bill.component.html',
  styleUrls: ['./retreive-bill.component.scss']
})
export class RetreiveBillComponent implements OnInit {
  public gridOptions: GridOptions;
  @Input() rowData: Bill[];
  public columnDefs: any[];
  @Output() showRetreive = new EventEmitter<boolean>();
  @Output() DeletedBills = new EventEmitter<Bill[]>();
  getRowNodeId: (data: any) => any;
  type: number;
  user: User;
  constructor(private authService: AuthService, private alertify: AlertifyService, 
              private billService: BillService, private route: ActivatedRoute) {
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
          alertify.confirm('هل انت متأكد من حذفه؟', () => {
            this.billService.deleteBill(p.data.id).subscribe(d => {
              if (d.isDeleted){
                this.rowData = this.rowData.filter(i => i.id !== p.data.id);
                localStorage.setItem('reteiveList', JSON.stringify(this.rowData));
                this.alertify.success('تم حذف الفاتورة');
                if (d.isNotEnough){
                  this.alertify.error('رجاءًا قُمْ بمراجعة حسابك');
                }
                if (p.data.type === 1){
                  this.user.money -=  p.data.paid;
                  this.authService.setMoney(this.user.money);
                }else{
                  this.user.money += p.data.paid;
                  this.authService.setMoney(this.user.money);
                }
                this.setDeletedEvent(this.rowData);
              }
            });
          });
        }
      },
      { field: 'id', headerName: 'الكود', type: 'rightAligned', filter: true },
      { field: 'cost', headerName: 'المبلغ', type: 'rightAligned' },
      { field: 'clientName', headerName: 'اسم العميل', type: 'rightAligned', filter: true },
      {field: 'createdAt', headerName: 'وقت التسجيل', type: 'rightAligned',
        cellRenderer: (data) => {
          if (data.value) {
            return moment(data.value).format('h:mm a');
          }
        }, sort: true
      }
    ];
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
  }
  showEvent(t: boolean){
    this.showRetreive.emit(t);
  }
  setDeletedEvent(bills: Bill[]){
    this.DeletedBills.emit(bills);
  }
}
