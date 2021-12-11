import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { StockBill } from 'src/models/stockBill';
import { BillExpensesService } from 'src/service/billExpenses.service';
import { StockService } from 'src/service/stock.service';

@Component({
  selector: 'app-list-stock-bill',
  templateUrl: './list-stock-bill.component.html',
  styleUrls: ['./list-stock-bill.component.scss']
})
export class ListStockBillComponent implements OnInit {
  workers: string[] = [];
  stockItemForm: FormGroup = new FormGroup ({
    dateOfStockBill: new FormControl(null),
    billStockType: new FormControl('', [Validators.required]),
    worker: new FormControl('', [this.isExist])
  });
  public stockBill: StockBill;
  public gridOptions: GridOptions;
  public columnDefs: any[];
  public rowData: StockBill[];
  getRowNodeId: (data: any) => any;
  open = false;
  constructor(private stockService: StockService) { }

  get dateOfStockBill(){
    return this.stockItemForm.get('dateOfStockBill');
  }
  get billStockType(){
    return this.stockItemForm.get('billStockType');
  }
  get worker(){
    return this.stockItemForm.get('worker');
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
          this.stockService.getStockBill(p.data.id).subscribe(
            d => {
              if (d){
                this.stockBill = d;
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
      { field: 'worker', headerName: 'اسم العميل', type: 'rightAligned', filter: true },
      {
        field: 'userNavigation',
        headerName: 'اسم الموظف',
        type: 'rightAligned',
        cellRenderer: (p) => {
          return p.data.userNavigation.knownAs;
        },
        filter: true
      },
    ];
  }
  onSubmit(){
    if (this.stockItemForm.valid){
      this.stockService.getStockBills(this.stockItemForm.value).subscribe(d => {
        this.rowData = d;
      });
    }
  }
  searchForWorker(event){
    const name = event.target.value;
    if (name.length > 1 && this.stockItemForm.valid){
        this.stockService.searchForWorker(this.stockItemForm.value).subscribe(d => {
          if (d){
            this.workers = d;
          }
        }, e => {
          console.log(e);
        });
      }
  }
  isExist(): ValidatorFn| null {
    return (control: AbstractControl): ValidationErrors => {
      return this.workers.filter(c => c === control.value)[0] ? {isNotExist: true} : null;
    };
  }
  openEvent(event){
    this.open = event;
  }

  EditStockBillEvent(event){
    this.stockBill = event;
  }

}
