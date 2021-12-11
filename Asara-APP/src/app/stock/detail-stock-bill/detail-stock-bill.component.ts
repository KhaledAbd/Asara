import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/models/item';
import { StockBill } from 'src/models/stockBill';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/service/alterify.service';
import { StockService } from 'src/service/stock.service';

@Component({
  selector: 'app-detail-stock-bill',
  templateUrl: './detail-stock-bill.component.html',
  styleUrls: ['./detail-stock-bill.component.scss']
})
export class DetailStockBillComponent implements OnInit {
  items: Item[] = [];
  user: User;
  @Input() stockBill: StockBill;
  @Output() stockBillEdit = new EventEmitter<StockBill>();
  @Output() openDetailstockBill = new EventEmitter<boolean>();
  @Input() addItemOpen = false;
  constructor(private stockService: StockService, private alertifyService: AlertifyService,
              private router: Router) {
  }
  ngOnInit() {
    console.log(this.stockBill);
  }
  delete(id: number){
    this.alertifyService.confirm('هل تُريد حذف الفاتُورة؟', () => {
      this.stockService.deleteStockBill(id).subscribe(d => {
        if (d.isDeleted){
          if (d.isNotEnough){
            this.alertifyService.error('رجاءًا راجع حسابك');
          }
          this.alertifyService.success('تم الحذف بنجاح');
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
    });

  }

  setBillEdit(stockBill: StockBill){
    this.stockBillEdit.emit(stockBill);
  }
  setopenDetailStockBill(open: boolean){
    this.openDetailstockBill.emit(open);
  }
  setAddItemOpen(open){
    this.addItemOpen = open;
  }
  @HostListener('window:click', ['$event.target'])
   hide(event){
    if (event.id === 'myModal') {
      this.setopenDetailStockBill(false);
    }
  }

}
