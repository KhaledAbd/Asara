import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Unit } from 'src/models/unit';
import { AlertifyService } from 'src/service/alterify.service';
import { UnitService } from 'src/service/unit.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent implements OnInit {

  @Input() units: Unit[];
  @Output() openEvent = new EventEmitter<boolean>();
  @Output() unitEvent = new EventEmitter<Unit>();
  unitForm: FormGroup;
  constructor(private alertify: AlertifyService, private unitService: UnitService) { }

  ngOnInit() {
    this.unitForm = new FormGroup({
      name: new FormControl('', [Validators.required, this.isExist()])
    });
  }
  setOpenEvent(open: boolean){
    this.openEvent.emit(open);
  }
  setUnitEvent(unit: Unit){
    this.unitEvent.emit(unit);
  }
  onSubmit(){
    if (this.unitForm.valid){
      this.unitService.postUnit(this.unitForm.value).subscribe(d => {
        if (d.isSaved){
          this.setUnitEvent(d.unit);
          this.alertify.success('تم الإضافة بنجاحٍ');
          this.setOpenEvent(false);
        }
      });
    }
  }
  @HostListener('window:click', ['$event.target'])
  hide(event) {
    if (event.id === 'myModal') {
      this.setOpenEvent(false);
    }
  }
  get name() {
    return this.unitForm.get('name');
  }
  isExist(): import('@angular/forms').ValidatorFn| null {
      return (control: AbstractControl) => {
        return this.units.filter(u => u.name  === control.value);
      };
  }
}
