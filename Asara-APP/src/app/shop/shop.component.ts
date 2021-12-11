import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/models/item';
import { Shop } from 'src/models/shop';
import { Unit } from 'src/models/unit';
import { AlertifyService } from 'src/service/alterify.service';
import { ShopService } from 'src/service/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  shop: Shop;
  shopForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
    telephone: new FormControl('', [Validators.required, Validators.pattern('^[0][1][0152]{1}[0-9]*') ,
    Validators.minLength(9), Validators.maxLength(11)]),
    title: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(3)])
  });
  constructor(private alertify: AlertifyService, private shopService: ShopService,
              private route: ActivatedRoute) {
                this.route.data.subscribe(p => {
                  this.shop = p.shop;
                });
  }

  ngOnInit() {
    this.shopForm.reset(this.shop);
  }
  get name(){
    return this.shopForm.get('name');
  }
  get address(){
    return this.shopForm.get('address');
  }
  get telephone(){
    return this.shopForm.get('telephone');
  }
  get title(){
    return this.shopForm.get('title');
  }
  onSubmit(){
    if (this.shopForm.valid){
      this.shopService.postShop(this.shopForm.value).subscribe(d => {
        if (d.isSaved){
          this.alertify.success('تم اضافة معلومات المحل');
        }
        if (d.isUpdated){
          this.alertify.success('تم التعديل بنجاح');
        }
        this.shop = d.shop;
        this.shopForm.reset(this.shop);
      }, e => {
        console.log(e);
      });
    }
  }
}
