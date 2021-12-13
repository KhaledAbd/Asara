import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { Bill } from 'src/models/bill';
import { BillExpensesService } from 'src/service/billExpenses.service';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements OnInit {
  clients: string[] = [];
  expensesForm: FormGroup = new FormGroup ({
    dateOfBill: new FormControl(null),
    billType: new FormControl('', [Validators.required]),
    clientName: new FormControl('', [this.isExist])
  });
  public bill: Bill;
  public gridOptions: GridOptions;
  public columnDefs: any[];
  public rowData: Bill[];
  getRowNodeId: (data: any) => any;
  open = false;
  constructor(private billexpensesService: BillExpensesService) { }

  get dateOfBill(){
    return this.expensesForm.get('dateOfBill');
  }
  get billType(){
    return this.expensesForm.get('billType');
  }
  get clientName(){
    return this.expensesForm.get('clientName');
  }

  ngOnInit() {
    this.getRowNodeId = (data) => data.id;
    this.gridOptions = {
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
    } as GridOptions;
    this.columnDefs = [
      {
        field: 'id',
        headerName: 'عرض',
        type: 'rightAligned',
        cellRenderer: () => {
          return `<button class ="btn btn-success">عرض </button>`;
        },
        onCellClicked: (p) => {
          this.billexpensesService.getBill(p.data.id).subscribe(
            d => {
              if (d){
                this.bill = d;
                this.open = true;
              }
            }, e => {
              console.log(e);
            }
          );
        }
      },
      { field: 'id', headerName: 'الكود', type: 'rightAligned', filter: true },
      { field: 'createdAt', headerName: 'الوقت', type: 'rightAligned', filter: true,  cellRenderer: (data) => {
          if (data.value) {
            return moment(data.value).format('h:mm a');
          }
        }
      },
      { field: 'cost', headerName: 'التكلفة', type: 'rightAligned' },
      { field: 'paid', headerName: 'المدفوع', type: 'rightAligned' },
      { field: 'clientName', headerName: 'اسم العميل', type: 'rightAligned', filter:true },
      {
        field: 'userNavigation',
        headerName: 'اسم الموظف',
        type: 'rightAligned',
        cellRenderer: (p) => {
          return p.data.userNavigation.knownAs;
        },
        filter:true
      },
    ];
  }
  onSubmit(){
    if (this.expensesForm.valid){
      this.billexpensesService.getBills(this.expensesForm.value).subscribe(d => {
        this.rowData = d;
      });
    }
  }
  searchForClient(event){
    const name = event.target.value;
    if (name.length > 1 && this.expensesForm.valid){
        this.billexpensesService.searchForClient(this.expensesForm.value).subscribe(d => {
          if (d){
            this.clients = d;
          }
        }, e => {
          console.log(e);
        });
      }
  }
  isExist(): ValidatorFn| null {
    return (control: AbstractControl): ValidationErrors => {
      return this.clients.filter(c => c === control.value)[0] ? {isNotExist: true} : null;
    };
  }
  openEvent(event){
    this.open = event;
  }

  EditBillEvent(event){
    this.bill = event;
  }
}
