import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Unit } from 'src/models/unit';
import { AlertifyService } from 'src/service/alterify.service';
import { UnitService } from 'src/service/unit.service';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.css']
})
export class EditUnitComponent implements OnInit {

  @Input() unit: Unit;
  @Output() openEvent = new EventEmitter<boolean>();
  @Output() unitEditEvent = new EventEmitter<{ unit: Unit, isDeleted: boolean, isEdited: boolean }>();
  @Input() units: Unit[];
  editUnitForm: FormGroup;
  constructor(private unitService: UnitService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.editUnitForm = new FormGroup({
        id: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required, this.isExist()])
      });
    this.editUnitForm.reset(this.unit);
  }
  isExist(): import('@angular/forms').ValidatorFn {
    return (control: AbstractControl) => this.units.filter(u => u.name === control.value);
  }
  setOpenEvent(open: boolean){
    this.openEvent.emit(open);
  }
  setUnitEditEvent(unit: { unit: Unit, isDeleted: boolean, isEdited: boolean }){
    this.unitEditEvent.emit(unit);
  }
  delete(){
    this.alertify.confirm('هل أنت مُتأكد من حذف هذه الوِحدة؟', () => {
      this.unitService.deleteUnit(this.unit).subscribe(d => {
        if (d.isDeleted){
          this.setOpenEvent(false);
          console.log('dsaddsa');
          this.alertify.success('تم الحذف بنجاح');
          this.setUnitEditEvent({
            unit: this.unit,
            isDeleted: true,
            isEdited: false
          });
        }
      }, e => {
        console.log(e);
      });
    });

  }
  update(){
    if (this.editUnitForm.valid){
      this.unitService.putUnit(this.editUnitForm.value).subscribe(d => {
        if (d.isUpdated){
          this.alertify.success('تم التعديل بنجاح');
          this.setUnitEditEvent({
            unit: d.unit,
            isDeleted: false,
            isEdited: true
          });
          this.setOpenEvent(false);
        }
      }, e => {
        console.log(e);
      });
    }
  }
  @HostListener('window:click', ['$event.target'])
  hide(event) {
    if (event.id === 'myModal') {
      this.setOpenEvent(false);
    }
  }
}
