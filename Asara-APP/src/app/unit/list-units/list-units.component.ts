import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Unit } from 'src/models/unit';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/service/alterify.service';
import { UnitService } from 'src/service/unit.service';

@Component({
  selector: 'app-list-units',
  templateUrl: './list-units.component.html',
  styleUrls: ['./list-units.component.css']
})
export class ListUnitsComponent implements OnInit {
  public gridOptions: GridOptions;
  rowData: Unit[];
  public columnDefs: any[];
  getRowNodeId: (data: any) => any;
  open = false;
  unit: Unit;
  unitForm: FormGroup;
  constructor(private route: ActivatedRoute, private unitService: UnitService, private alertify: AlertifyService) {
    this.route.data.subscribe(d => {
      this.rowData = d.units;
    }, e => {
      console.log(e);
    }
    );
    this.gridOptions = ({
      onGridReady: () => {
          this.gridOptions.api.sizeColumnsToFit();
      },
  } as GridOptions);
    this.columnDefs = [
      { field: 'name', headerName: 'إسم الوِحدة', type: 'rightAligned', sort: true, filter: true },
      {field: 'id', headerName: 'عرض', type: 'rightAligned', cellRenderer: params => {
        return `<button class ="btn btn-success">عرض </button>`;
      },
      onCellClicked: p => {
         this.unit = p.data;
         this.open = true;
      }
      }
  ];
  }

  ngOnInit() {
    this.unitForm = new FormGroup({
      name: new FormControl('', [Validators.required, this.isExist()])
    });
  }
  setOpen(event: boolean){
    this.open = event;
  }

  setUnitEdit(unit: {unit: Unit, isEdited: boolean, isDeleted: boolean}){
    if (unit.isDeleted){
      this.rowData = this.rowData.filter(u => unit.unit.id !== +u.id);
    }
    if (unit.isEdited){
      this.rowData = this.rowData.filter(u => unit.unit.id !== +u.id);
      this.rowData.push(unit.unit);
      this.rowData =  this.rowData.reverse();
    }
  }
  onSubmit(){
    if (this.unitForm.valid){
      this.unitService.postUnit(this.unitForm.value).subscribe(d => {
        if (d.isSaved){
          this.alertify.success('تمَّت الإضافة');
          this.rowData.push(d.unit);
          this.rowData.reverse();
          this.gridOptions.api.setRowData(this.rowData);
        }
      });
    }
  }
  isExist(): import('@angular/forms').ValidatorFn| null {
    return (control: AbstractControl) => {
      return this.rowData.filter(u => u.name  === control.value);
    };
  }
}