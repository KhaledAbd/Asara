import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/models/item';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/service/alterify.service';
import { AuthService } from 'src/service/auth.service';
import { StockService } from 'src/service/stock.service';

@Component({
  selector: 'app-add-stock-bill',
  templateUrl: './add-stock-bill.component.html',
  styleUrls: ['./add-stock-bill.component.scss']
})
export class AddStockBillComponent implements OnInit {
  stockBillForm: FormGroup;
  stockItems: FormArray;
  items: Item[];
  item: Item;
  user: User;
  typePage: number;
  choisedItems: Item[] = [];
  reteiveList = [];
  openRetreive = false;
  constructor(private fb: FormBuilder, private stockService: StockService,
              private route: ActivatedRoute, private authService: AuthService,
              private alertify: AlertifyService, private router: Router) {
                this.route.data.subscribe(
                  d => {
                    this.user = d.user;
                    if (!this.items){
                      this.items = d.items;
                    }
                  }
                  , e => {
                    console.log(e);
                    this.authService.logout();
                  });
                this.route.params.subscribe(
                  d => {
                    this.typePage = d.id;
                  }
                );
               }

  ngOnInit() {
    this.stockBillForm = new FormGroup({
      createdAt: new FormControl(new Date().toLocaleTimeString(), [Validators.required]),
      userId: new FormControl(this.user.id, [Validators.required]),
      type: new FormControl(this.typePage, [Validators.required, Validators.min(0), Validators.max(2)]),
      worker: new FormControl('لا يوجد', [Validators.required])
    });
    this.stockItems = this.fb.array([this.createItemFormGroup()]);
    this.stockBillForm.addControl('stockItems', this.stockItems);
    this.reteiveList = JSON.parse(localStorage.getItem('reteiveStockList'));
  }
  isFirst() {
    return this.stockItems.length == 1;
  }
  onSubmit() {
    this.stockBillForm.get('createdAt').setValue(new Date().toLocaleTimeString());
    if (this.stockBillForm.valid){
      this.stockService.postStockBill(this.stockBillForm.value).subscribe(d => {
        if (d.isSaved){
          this.reteiveList = this.reteiveList || [];
          this.reteiveList.push(d.stockBill);
          localStorage.setItem('reteiveStockList', JSON.stringify(this.reteiveList));
          this.alertify.success('تم التسجيل بنجاح');
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
  addNewrow() {
    if (this.items.length > 0 &&  document.getElementsByTagName('select').length === 0) {
      this.stockItems.push(this.createItemFormGroup());
    }
    return;
  }
  onRemoveRow(index) {
    if (this.stockItems.value[index].itemId){
      this.items.push(this.choisedItems.filter(p => p.id ==  +this.stockItems.value[index].itemId)[0]);
      this.choisedItems = this.choisedItems.filter(p => p.id != this.stockItems.value[index].itemId);
    }
    this.stockItems.removeAt(index);
    this.setTotal();
  }
  createItemFormGroup(): FormGroup {
    return this.fb.group(
      {
        itemId: new FormControl('', [Validators.required, Validators.min(0)]),
        quentity: new FormControl('', [Validators.required, Validators.min(1)]),
        price: new FormControl('')
      }
    );
  }
  setItem(event){
    const id = event.target.value;
    this.item = this.items.filter(i => i.id == +id)[0];
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
          if (this.stockItems.value[row.rowIndex - 1].itemId){
            this.items.push(this.choisedItems.filter(p => p.id == this.stockItems.value[row.rowIndex - 1].itemId)[0]);
            this.choisedItems = this.choisedItems.filter(p => p.id != this.stockItems.value[row.rowIndex - 1].itemId);
          }
          this.stockItems.controls[row.rowIndex - 1].reset();
          parent.appendChild(selectItem);
          text.remove();
        }
      });
      parent.appendChild(text);
      this.items = this.items.filter(i => i.id != this.item.id);
    }
  }
  setTotal() {
    let total = 0;
    const itemsList = new Map<number, {
      quentity: number,
      total: number,
      itemId: number
    }>();
    for (const stockItem of this.stockItems.controls) {
      const price: number = stockItem.get('price').value;
      const quentity: number = stockItem.get('quentity').value;
      const itemId: number = stockItem.get('itemId').value;

      if (this.typePage > 0) {
        if (!itemsList[itemId]) {
          itemsList[itemId] = {
            total: 0,
            quentity: this.item.quentity,
            itemId: this.item.id
          };
        }
        itemsList[itemId].total += quentity;
        if (itemsList[itemId].quentity < itemsList[itemId].total && itemsList[itemId].itemId == itemId) {
          stockItem.get('quentity').setErrors({ notEnought: true });
        }
      }
      total += (quentity * price);
    }
  }
  showListRetreive(event) {
    return this.openRetreive = event;
  }
  resetBills(event) {
    return this.reteiveList = event;
  }
  removeList() {
    this.alertify.confirm('هل تُريد إخلاء القائمة من المُرتجع؟', () => {
      localStorage.removeItem('reteiveStockList');
      this.reteiveList = null;
    });
  }
}
