import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/models/bill';
import { Item } from 'src/models/item';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/service/alterify.service';
import { AuthService } from 'src/service/auth.service';
import { BillService } from 'src/service/bill.service';

@Component({
  selector: 'app-detail-bill',
  templateUrl: './detail-bill.component.html',
  styleUrls: ['./detail-bill.component.scss']
})
export class DetailBillComponent implements OnInit {
  items: Item[] = [];
  user: User;
  @Input() bill: Bill;
  @Output() billEdit = new EventEmitter<Bill>();
  @Output() openDetailBill = new EventEmitter<boolean>();
  @Input() addPaidOpen = false;
  constructor(private billService: BillService, private authService: AuthService,
              private alertifyService: AlertifyService, private router: Router) {
   this.user = authService.currentUserValue;
  }
  ngOnInit() {
  }
  delete(id:number){
    this.alertifyService.confirm('هل تُريد حذف الفاتُورة؟', () => {
      this.billService.deleteBill(id).subscribe(d => {
        if(d.isDeleted){
          if (d.isNotEnough){
            this.alertifyService.error('رجاءًا راجِعْ حسابك');
          }
          if(this.bill.type === 1){
            this.user.money -= this.bill.paid;
            this.authService.setMoney(this.user.money);
          }else{
            this.user.money += this.bill.paid;
            this.authService.setMoney(this.user.money);
          }
          this.authService.setMoney(this.user.money);
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

  setBillEdit(bill: Bill){
    this.billEdit.emit(bill);
  }
  setopenDetailBill(open: boolean){
    this.openDetailBill.emit(open);
  }
  setAddPaidOpen(open){
    this.addPaidOpen = open;
  }
  setPaidExpenseBill(bill){
    this.setBillEdit(bill);
    this.bill = bill;
  }
  @HostListener('window:click', ['$event.target'])
   hide(event){
    if (event.id === 'myModal') {
      this.setopenDetailBill(false);
    }
  }

}

export const isLarge: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const cost: number = control.get('cost').value;
  const paid: number = control.get('paid').value;
  if (cost < paid){
    control.get('paid').setErrors({isLarge: true});
  }
  return cost < paid ? { isLarge: true } : null;
};
