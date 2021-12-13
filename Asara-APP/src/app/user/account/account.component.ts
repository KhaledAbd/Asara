import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { Account } from 'src/models/account';
import { User } from 'src/models/user';
import { AccountService } from 'src/service/account.service';
import { AlertifyService } from 'src/service/alterify.service';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public gridOptions: GridOptions;
  public columnDefs: any[];
  accountForm: FormGroup;
  rowData: Account[] = [];
  getRowNodeId: (data: any) => any;
  user: User;
  constructor(private alertify: AlertifyService, private accountService: AccountService,
              private route: ActivatedRoute, private authService: AuthService) {
    this.route.data.subscribe(d => {
      if (d.user) {
        this.user = d.user;
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
        cellRenderer: () => {
          return `<button class ="btn btn-danger">حذف </button>`;
        },
        onCellClicked: (p) => {
          if(this.isMutch){
            alertify.confirm('هل تُريد حذف تعديل الحساب؟', () => {
              this.accountService.deleteAccount(p.data.id).subscribe(
                d => {
                  if (d.isDeleted){
                    alertify.success('تم الحذف بنجاح');
                    this.rowData = this.rowData.filter(e => e.id !== p.data.id);
                    if (p.data.isIntial){
                      this.user.money -= p.data.money;
                      this.authService.setMoney(this.user.money);
                      console.log('sad');

                    }else{
                      this.user.money = p.data.lastUserMoney;
                      this.authService.setMoney(p.data.lastUserMoney);
                    }
                  }
                }, e => {
                  console.log(e);
                }
              );
            });
          }
        }
      },
      { field: 'money', headerName: 'المال', type: 'rightAligned', filter: true },
      { field: 'lastUserMoney', headerName: 'قبل التعديل', type: 'rightAligned' },
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
    this.accountForm = new FormGroup({
      money: new FormControl(null, [Validators.required, Validators.min(0)]),
      lastUserMoney: new FormControl(),
      userId: new FormControl(this.user.id),
      createdAt: new FormControl(),
      isIntial: new FormControl(false, [Validators.required])
    });
    this.accountService.getAccount().subscribe(d => {
      this.rowData = d.reverse();
    },
      e => {
        console.log(e);
      }
    );
  }
  onSubmit() {
    this.accountForm.get('createdAt').setValue(new Date().toLocaleString());
    this.accountForm.get('lastUserMoney').setValue(this.user.money);
    this.accountForm.get('userId').setValue(this.user.id);

    if (this.accountForm.valid) {
      this.accountService.AddAccount(this.accountForm.value).subscribe(d => {
        if (d.isSaved) {
          this.rowData.push(d.account);
          this.gridOptions.api?.setRowData(this.rowData.reverse());
          this.alertify.success('تم الإضافةُ بنجاح');
          if (d.account.isIntial){
            this.user.money += d.account.money;
            this.authService.setMoney(this.user.money);
          }else{
            this.user.money = d.account.money;
            this.authService.setMoney(this.user.money);
          }
          this.accountForm.reset({
            userId: this.user.id,
            isIntial: false
          });
        }
      }, e => {
        console.log(e);
      });
    }
  }

  search(event){
    this.accountService.getAccountByDate(event.target.value).subscribe(d => {
      if (d){
        this.rowData = d;
      }
    });
  }
  isMutch(){
    return this.authService.roleMatch(['Admin']);
  }
}
