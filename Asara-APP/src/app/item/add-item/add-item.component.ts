import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Item } from 'src/models/item';
import { Unit } from 'src/models/unit';
import { AlertifyService } from 'src/service/alterify.service';
import { ItemService } from 'src/service/item.service';
import { UnitService } from 'src/service/unit.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  items: Item[];
  units: Unit[];
  open: boolean;
  itemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(18), Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)]),
    unit: new FormControl('', [Validators.required]),
  }, this.itemIsExist());
  constructor(private itemService: ItemService, private unitService: UnitService, private alertify: AlertifyService) {
    this.itemService.getItems().subscribe(d => {
      this.items = d;
    }, e => {
      console.log(e);
    });
    this.unitService.getUnits().subscribe(d => {
      this.units = d;
    });
  }

  ngOnInit() {
  }
  get name(){
    return this.itemForm?.get('name');
  }
  get price(){
    return this.itemForm?.get('price');
  }
  get unit(){
    return this.itemForm?.get('unit');
  }
  onSubmit(){
    if (this.itemForm.valid){
      this.itemService.postItem({
        name: this.name.value,
        price: this.price.value,
        unitId: this.unit.value
      }).subscribe(d => {
        if (d.isSaved){
          this.alertify.success('تم إضافة الصنف');
          this.itemForm.reset();
        }
      }, e => {
        console.log(e);
      });
    }
  }
  setOpen(event: boolean){
    this.open = event;
  }
  setUnit(event: Unit){
    this.units.push(event);
  }
  itemIsExist(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {  
      return this.name && this.unit && this.items?.filter(i => i.name == this.name.value && i.unitNavigation.id == +this.unit.value)[0] ? { exist: true } : null;
    };
  }

}
