import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Bill } from 'src/models/bill';
import { Item } from 'src/models/item';
import { Shop } from 'src/models/shop';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/service/alterify.service';
import { AuthService } from 'src/service/auth.service';
import { BillService } from 'src/service/bill.service';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit {
  items: Item[];
  choisedItems: Item[] = [];
  item: Item = null;
  openRetreive = false;
  billType = 1;
  billForm = new FormGroup({
    cost: new FormControl(0, [Validators.min(0)]),
    createdAt: new FormControl(),
    userId: new FormControl([Validators.required]),
    type: new FormControl(this.billType, [Validators.required, Validators.min(0), Validators.max(2)]),
    clientName: new FormControl('لا يوجد', [Validators.minLength(4)]),
    paid: new FormControl(null, [Validators.required, Validators.min(0)]),
    discount: new FormControl('0', [Validators.required, Validators.min(0), Validators.max(100)])
  }, { validators: isLarge });
  billItems: FormArray;
  reteiveList = [];
  user: User;
  shop: Shop;
  constructor(private route: ActivatedRoute, private billService: BillService,
              private formBuilder: FormBuilder, private authService: AuthService,
              private alertifyService: AlertifyService, private router: Router) {
    this.route.data.subscribe(
      d => {
        if (!this.items) {
          this.items = d.items;
        }
        this.shop = d.shop;
      }
      , e => {
        console.log(e);
        this.authService.logout();
      });
    this.user = this.authService.currentUserValue;
  }
  addNewrow() {
    if (this.items.length > 0 && document.getElementsByTagName('select').length === 0) {
      this.billItems.push(this.createItemFormGroup());
    }
    return;
  }
  get cost() {
    return this.billForm.get('cost');
  }
  get type() {
    return this.billForm.get('type');
  }
  get paid() {
    return this.billForm.get('paid');
  }
  get discount() {
    return this.billForm.get('discount');
  }
  get clientName() {
    return this.billForm.get('clientName');
  }
  onRemoveRow(index) {
    if (this.billItems.value[index].itemId){
      this.items.push(this.choisedItems.filter(p => p.id ==  +this.billItems.value[index].itemId)[0]);
      this.choisedItems = this.choisedItems.filter(p => p.id != this.billItems.value[index].itemId);
    }
    this.billItems.removeAt(index);
    this.setTotal();
  }
  createItemFormGroup(): FormGroup {
    return this.formBuilder.group(
      {
        itemId: new FormControl('', [Validators.required, Validators.min(0)]),
        quentity: new FormControl('', [Validators.required, Validators.min(1)]),
        price: new FormControl('', [Validators.min(0)])
      }
    );
  }
  ngOnInit() {
    this.billItems = this.formBuilder.array([this.createItemFormGroup()]);
    this.billForm.addControl('billItems', this.billItems);
    this.route.params.subscribe(d => {
      if (+d.id > -1 && +d.id < 2) {
        this.type.setValue(d.id);
        this.billType = +d.id;
      }
    }, e => {
      console.log(e);
    });
    this.reteiveList = JSON.parse(localStorage.getItem('reteiveList'));
  }
  setInfo(event, f) {
    const id = event.target.value;
    this.item = this.items.filter(i => i.id == +id)[0];
    f.setValue(this.item.price);
    this.choisedItems.push(this.item);
  }
  ListChoisedAction(selectItem) {
    const parent = selectItem.parentNode;
    selectItem.remove();
    if (parent) {
      const text = document.createElement('input');
      text.value = this.item.unitNavigation.name + ' ' + this.item.name;
      text.type = 'text';
      text.readOnly = true;
      text.className = 'form-control myInput text-center';
      text.style.width = '150px';
      text.style.textAlign = 'center';
      text.style.margin = 'auto';
      text.addEventListener('dblclick', () => {
        const length = document.getElementsByTagName('select').length;
        const row = text.parentElement.parentElement as HTMLTableRowElement;
        if (length === 0 ) {
          if (this.billItems.value[row.rowIndex - 1].itemId){
            this.items.push(this.choisedItems.filter(p => p.id == this.billItems.value[row.rowIndex - 1].itemId)[0]);
            this.choisedItems = this.choisedItems.filter(p => p.id != this.billItems.value[row.rowIndex - 1].itemId);
          }
          this.billItems.controls[row.rowIndex - 1].reset();
          parent.appendChild(selectItem);
          text.remove();
        }
      });
      parent.appendChild(text);
      this.items = this.items.filter(i => i.id != this.item.id);
    }
  }
  isFirst() {
    return this.billItems.length === 1;
  }
  onSubmit() {
    this.billForm.get('createdAt').setValue(new Date().toLocaleString());
    this.billForm.get('userId').setValue(this.user.id);
    if (this.billForm.valid) {
      const bill: Bill = this.billForm.value;
      const discount: number = +this.discount.value;
      if (discount != 0){
        for (let i = 0; i < bill.billItems.length; i++){
          const price: number = bill.billItems[i].price;
          bill.billItems[i].price = price - (price * (discount / 100));
        }
      }
      this.billService.postBill(bill).subscribe(d => {
        if (d.bill) {
          if (d.isNotEnough){
            if (d.bill.type == 1 ){
              this.alertifyService.error('الكمية ليست موجودة ');
            }else{
              this.alertifyService.error('المال غير كافٍ راجع حسابك');
            }
          }
          if (d.isSaved) {
            this.reteiveList = this.reteiveList || [];
            this.reteiveList.push(d.bill);
            localStorage.setItem('reteiveList', JSON.stringify(this.reteiveList));
            this.alertifyService.success('تم الإضافة بنجاح');
            const discount: number = this.discount.value;
            this.billForm.reset();
            if (d.bill.type === 1) {
              this.authService.setMoney(this.user.money + d.bill.paid);
            } else {
              this.authService.setMoney(this.user.money - d.bill.paid);
            }
            setTimeout(() => {
              this.print(d.bill, discount);
            }, 900);
          }
        }
      }, e => {
        console.log(e);
      });
    }
  }
  setTotal() {
    let total = 0;
    const itemsList = new Map<number, {
      quentity: number,
      total: number,
      itemId: number
    }>();
    for (const billItem of this.billItems.controls) {
      const price: number = billItem.get('price').value;
      const quentity: number = billItem.get('quentity').value;
      const itemId: number = billItem.get('itemId').value;
      if (this.type.value > 0) {
        if (!itemsList[itemId]) {
          itemsList[itemId] = {
            total: 0,
            quentity: this.item.quentity,
            itemId: this.item.id
          };
        }
        itemsList[itemId].total += quentity;
        if (itemsList[itemId].quentity < itemsList[itemId].total && itemsList[itemId].itemId == itemId) {
          billItem.get('quentity').setErrors({ notEnought: true });
          setTimeout(() => {
            billItem.get('quentity').setErrors(null);
          }, 500);
        }
      }
      total += (quentity * price) - ((quentity * price) * (+this.discount.value / 100));
    }
    this.cost.reset(total);
    if (this.billType === 1) {
      this.paid.reset(total);
    }

  }
  showListRetreive(event) {
    return this.openRetreive = event;
  }
  resetBills(event) {
    return this.reteiveList = event;
  }
  removeList() {
    this.alertifyService.confirm('هل تُريد إخلاء القائمة من المُرتجع؟', () => {
      localStorage.removeItem('reteiveList');
      this.reteiveList = null;
    });
  }

  print(bill: Bill, discount: number) {
    const type = bill.type === 0 ? 'شراء' : 'بيع';
    window.document.write(`
        <head>
            <title>فاتورة رقم ${bill.id}</title>
            <style>
            body {
              font-weight: bold;
              font-family: 'Cairo', sans-serif;
          }
          .container {
              width: 60%;
              height: auto;
              /* background-color: brown; */
              margin: auto;
              text-align: center;
          }

          hr {
              height: 0.1px;
              width: 55%;
              background-color: #000;
          }

          span {
              display: inline-block;
          }

          .top-invoice {
              margin-bottom: 20px;
          }

          .top-invoice .info-shop h3 {
              margin-bottom: 3px;
          }

          .top-invoice .info-shop .address {
              margin-top: -1px;
              margin-bottom: 15px;
              margin-right: 70px;
          }

          .telephone {
              margin-bottom: 5px;
          }

          .name-cust,
          .day,
          .my-time {
              margin-right: 15px;
              margin-top: -5px;
          }

          .plus-info {
              margin-top: 10px;
          }

          .plus-info .name-casher {
              margin-right: 30px;
          }
          .data-invocie .first-table {
              width: 100%;
              margin: -5px auto;
              text-align: center;
          }
          .data-invocie .first-table {
              border-top: 1px solid #000;
              border-bottom: 1px solid #000;
          }
          .data-invocie .first-table th {
              border-bottom: 1px solid #000;
          }
          .sec-table,
          .third-table {
              width: 100%;
              margin-top: 2px;
              border-bottom: 1px solid #000;
          }
          .sec-table th,
          .third-table th {
              border-bottom: none;
              margin-right: 0;
          }
          </style>
        </head>
      <div class="container">
        <div class="top-invoice">
            <div class="info-shop">
                <h3>${this.shop?.name || 'اسم المحل'}</h3>
                <span class="address">${this.shop?.address || 'العنوان'}</span>
                <span class="telephone">ت: ${this.shop?.telephone || 'التليفون'}</span>
            </div>

            <div class="info-invoice">
                <span class="name-cust">إسم العميل:${bill.clientName} </span>
                <span class="day">${moment(bill.createdAt).format('YYYY-MM-DD')}</span>
                <span class="my-time">${moment(bill.createdAt).format('h:mm a')}</span>
            </div>

            <div class="plus-info">
                <span class="name-casher">إسم الكاشير: ${bill.userNavigation.knownAs}</span>
                <span class="id-invoice">رقم الفاتورة: ${bill.id}</span>
            </div>
            <div class="plus-info">
                <span class="name-casher">نوع الفاتوره: ${type}</span>
            </div>
        </div>
            `);
    window.document.write(`
    <div class="center">
    <div class="container">
        <div class="data-invocie">
            <table class="first-table">
                <thead>
                    <tr>
                        <th>الاجمالى</th>
                        <th>السعر</th>
                        <th>الكمية</th>
                        <th>الصنف</th>
                    </tr>
                </thead>
                <tbody>
                    `);
    for (const billItem of bill.billItems) {
      window.document.write(`
      <tr>
          <td>${(billItem.quentity * billItem.price)}</td>
          <td>${billItem.price}</td>
          <td>${billItem.quentity}</td>
          <td>${billItem.itemNavigation.unitNavigation.name} ${billItem.itemNavigation.name}</td>
      </tr>
    `);
    }
    window.document.write(`
            </tbody>
          </table>
    <table class="third-table">
                        <tr>
                            <tr>
                                <td>${bill.cost}</td>
                                <th>المــدفـــوع</th>
                            </tr>
                            <tr>
                                <td>${bill.cost - bill.paid}</td>
                                <th>الباقــي</th>
                            </tr>
                           `);
    if (discount != 0){
      window.document.write(` <tr>
                                <td>%${discount}</td>
                                <th>الخصم</th>
                              </tr>`);
    }

    window.document.write(`
                        </tr>
                    </table>

                </div>
            </div>
        </div>
    </div>
    `);
    window.print();
    window.location.assign(`/addbill/${bill.type}`);
  }
}

export const isLarge: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const cost: number = control.get('cost').value;
  const paid: number = control.get('paid').value;
  if (cost < paid) {
    control.get('paid').setErrors({ isLarge: true });
  }
  return cost < paid ? { isLarge: true } : null;
};