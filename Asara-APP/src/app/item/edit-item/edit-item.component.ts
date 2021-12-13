import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/models/item';
import { Unit } from 'src/models/unit';
import { AlertifyService } from 'src/service/alterify.service';
import { ItemService } from 'src/service/item.service';
import { UnitService } from 'src/service/unit.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  @Input() item: Item;
  @Output() openEvent = new EventEmitter<boolean>();
  @Output() itemEditEvent = new EventEmitter<{ item: Item, isDeleted: boolean, isEdited: boolean }>();
  public units: Unit[];
  editItemform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quentity: new FormControl('', [Validators.required]),
    unitId: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required])
  });
  constructor(private itemService: ItemService, private alertify: AlertifyService, private unitService: UnitService) { }

  ngOnInit() {
    this.unitService.getUnits().subscribe(d => {
      this.units = d;
    }, e => {
      console.log(e);
    });
    this.editItemform.reset(this.item);
    this.setItemEditEvent({
      item: this.item,
      isDeleted: false,
      isEdited: false
    });
    this.editItemform.get('unitId').setValue(this.item.unitNavigation.id);
    this.editItemform.disable();
  }
  setOpenEvent(open: boolean) {
    this.openEvent.emit(open);
  }
  setItemEditEvent(itemAction: { item: Item, isDeleted: boolean, isEdited: boolean }) {
    this.itemEditEvent.emit(itemAction);
  }
  get type(){
    return this.editItemform.get('type');
  }
  update() {
    if (!this.editItemform.disabled) {
      if (this.editItemform.valid) {
        this.alertify.confirm('هل أنت مُتأكد من تعديل الصنف الحالي؟', () => {
           this.itemService.updateItem(this.item.id, this.editItemform.value).subscribe(
          d => {
            if (d.isUpdated) {
              this.setItemEditEvent({
                item: d.item,
                isDeleted: false,
                isEdited: true
              });
              this.setOpenEvent(false);
              this.alertify.success('تم التعديل بنجاح');
            }
          }, e => {
            console.log(e);
          }
        );
        });
      }
    } else {
      this.editItemform.enable();
    }
  }
  delete() {
    this.alertify.confirm(`  هل تُريد بالتأكيد حذف صنف ${this.item.name}؟`, () => {
      this.itemService.deleteItem(this.item.id).subscribe(d => {
        if (d.isDeleted) {
          this.setItemEditEvent({
            item: this.item,
            isDeleted: true,
            isEdited: false
          });
          this.alertify.message('تم الحذف بنجاح');
          this.setOpenEvent(false);
        }
      }, e => {
        console.log(e);
      });
    });
  }
  @HostListener('window:click', ['$event.target'])
  hide(event) {
    if (event.id === 'myModal') {
      this.setOpenEvent(false);
    }
  }
}
