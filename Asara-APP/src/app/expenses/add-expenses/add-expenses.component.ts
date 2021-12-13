import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { Bill } from 'src/models/bill';
import { Expenses } from 'src/models/expenses';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/service/alterify.service';
import { AuthService } from 'src/service/auth.service';
import { ExpensesService } from 'src/service/expenses.service';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss']
})
export class AddExpensesComponent implements OnInit {
  public gridOptions: GridOptions;
  public columnDefs: any[];
  @Input() bill: Bill;
  @Output() billEvent = new EventEmitter<Bill>();
  @Output() openEvent = new EventEmitter<boolean>();
  expensesForm: FormGroup;
  rowData: Expenses[] = [];
  getRowNodeId: (data: any) => any;
  user: User;
  constructor(private alertify: AlertifyService, private expensesService: ExpensesService,
              private authService: AuthService, private router: Router) {
    this.user = this.authService.currentUserValue;
    this.getRowNodeId = (data) => data.id;
    this.gridOptions = {
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
    } as GridOptions;
    this.columnDefs = [
      {
        field: 'id',
        headerName: 'حذف',
        type: 'rightAligned',
        cellRenderer: (params) => {
          return `<button class ="btn btn-danger">حذف </button>`;
        },
        onCellClicked: (p) => {
          alertify.confirm('هل تُريد حذف هذا المصروف؟', () => {
            this.expensesService.deleteExpenses(p.data.id).subscribe(
              d => {
                if (d.isDeleted){
                  alertify.success('تم الحذف بنجاح');
                  this.rowData = this.rowData.filter(e => e.id !== p.data.id);
                  if (this.bill.type === 1){
                    this.user.money -= p.data.paid;
                    this.authService.setMoney(this.user.money);
                  }else{
                    this.user.money += p.data.paid;
                    this.authService.setMoney(this.user.money);
                  }
                  setTimeout(() => {
                    const currentUrl = this.router.url;
                    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                      this.router.navigate([currentUrl]);
                    });
                  }, 500);
                }
              }, e => {
                console.log(e);
              }
            );
          });
        }
      },
      { field: 'paid', headerName: 'القيمة', type: 'rightAligned', filter: true},
      { field: 'reason', headerName: 'السبب', type: 'rightAligned' },
      { field: 'createdAt', headerName: 'وقت التسجيل', type: 'rightAligned',
        cellRenderer: (data) => {
          return moment(data.value).format('Do, h:mm a');
        }
      },
      { field: 'userNavigation', headerName: 'وقت التسجيل', type: 'rightAligned',
        cellRenderer: (data) => {
          return data.value.knownAs;
        }
      }
    ];
  }

  ngOnInit() {
    this.expensesForm = new FormGroup({
      paid: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(this.bill.cost - this.bill.paid)]),
      reason: new FormControl('', [Validators.maxLength(30)]),
      billId: new FormControl(this.bill.id),
      userId: new FormControl(this.user.id),
      createdAt: new FormControl()
    });
    this.expensesService.getExpenses(this.bill.id).subscribe(d => {
      this.rowData = d;
    }
    );
  }
  setBillEvent(bill: Bill){
    this.billEvent.emit(bill);
  }
  setOpenEvent(open: boolean){
    this.openEvent.emit(open);
  }
  onSubmit(){
    this.expensesForm.get('createdAt').setValue(new Date().toLocaleDateString());
    if (this.expensesForm.valid){
      this.expensesService.AddExpenses(this.expensesForm.value).subscribe(d => {
        if (d.isSaved){
          this.rowData.push(d.expenses);
          this.alertify.success('تمَّت الإضافة بنجاح');
          this.bill.paid += d.expenses.paid;
          this.setBillEvent(this.bill);
          this.gridOptions.api.setRowData(this.rowData);
          if (this.bill.type === 1){
            this.user.money += d.expenses.paid;
            this.authService.setMoney(this.user.money);
          }else{
            this.user.money -= d.expenses.paid;
            this.authService.setMoney(this.user.money);
          }
          setTimeout(() => {
            const currentUrl = this.router.url;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
            });
          }, 500);
        }
      }, e => {
        console.log(e);
      });
    }
  }
}
