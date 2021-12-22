import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { Expenses } from 'src/models/expenses';
import { ExtraExpenses } from 'src/models/extraExpenses';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/service/alterify.service';
import { AuthService } from 'src/service/auth.service';
import { ExpensesService } from 'src/service/expenses.service';
import { ExtraExpensesService } from 'src/service/extraExpenses.service';

@Component({
  selector: 'app-extra-expenses',
  templateUrl: './extra-expenses.component.html',
  styleUrls: ['./extra-expenses.component.scss']
})
export class ExtraExpensesComponent implements OnInit {
  public gridOptions: GridOptions;
  public columnDefs: any[];
  extraExpensesForm: FormGroup;
  rowData: ExtraExpenses[] = [];
  getRowNodeId: (data: any) => any;
  user: User;
  constructor(private alertify: AlertifyService, private extraExpensesService: ExtraExpensesService,
              private route: ActivatedRoute, private authService: AuthService) {
    this.route.data.subscribe(d => {
      if (d.user) {
        this.user = d.user;
        this.authService.setMoney(d.user.money);
      }
    });
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
            this.extraExpensesService.deleteExpenses(p.data.id).subscribe(
              d => {
                if (d.isDeleted) {
                  alertify.success('تم الحذف بنجاح');
                  this.rowData = this.rowData.filter(e => e.id !== p.data.id);
                  this.user.money += p.data.paid;
                  this.authService.setMoney(this.user.money);
                }
              }, e => {
                console.log(e);
              }
            );
          });
        }
      },
      { field: 'paid', headerName: 'المال', type: 'rightAligned', filter: true },
      { field: 'reason', headerName: 'السبب', type: 'rightAligned' },
      {
        field: 'createdAt', headerName: 'وقت التسجيل', type: 'rightAligned',
        cellRenderer: (data) => {
          return moment(data.value).format('Do, h:mm a');
        }
      },
      {
        field: 'userNavigation', headerName: 'اسم المُسجل', type: 'rightAligned',
        cellRenderer: (data) => {
          return data.value.knownAs;
        }
      }
    ];
  }


  ngOnInit() {
    this.extraExpensesForm = new FormGroup({
      paid: new FormControl('', [Validators.required, Validators.min(0)]),
      reason: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      userId: new FormControl(),
      createdAt: new FormControl()
    });
    this.extraExpensesService.getExtraExpenses().subscribe(d => {
      this.rowData = d;
    },
      e => {
        console.log(e);
      }
    );
  }
  onSubmit() {
    this.extraExpensesForm.get('createdAt').setValue(new Date().toLocaleString());
    this.extraExpensesForm.get('userId').setValue(this.user.id);
    if (this.extraExpensesForm.valid) {
      this.extraExpensesService.AddExtraExpenses(this.extraExpensesForm.value).subscribe(d => {
        if (d.isSaved) {
          this.rowData.push(d.extraExpenses);
          this.alertify.success('تمَّ الإضافة بنجاح');
          this.gridOptions.api?.setRowData(this.rowData);
          this.authService.setMoney(this.user.money - d.extraExpenses.paid);
          if (d.isNotEnough){
            this.alertify.error('رجاءًا راجع حسابك');
          }
          this.user.money -= d.extraExpenses.paid;
          this.authService.setMoney(this.user.money);
          this.extraExpensesForm.reset();
        }
      }, e => {
        console.log(e);
      });
    }
  }

  search(event){
    this.extraExpensesService.getExtraExpensesByDate(event.target.value).subscribe(d => {
      if(d){
        this.rowData = d;
      }
    })
  }
}
