import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { Item } from 'src/models/item';
import { User } from 'src/models/user';
import { ItemService } from 'src/service/item.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  public gridOptions: GridOptions;
  public columnDefs: any[];
  public rowData: Item[];
  getRowNodeId: (data: any) => any;
  open = false;
  item: Item;
  constructor(
    private itemService: ItemService,
  ) {
    this.itemService.getItems().subscribe(
      (d) => {
        this.rowData = d;
      },
      (e) => {
        console.log(e);
      }
    );
    this.getRowNodeId = (data) => data.id;
    this.gridOptions = {
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
    } as GridOptions;
    this.columnDefs = [
      {
        field: 'id',
        headerName: 'عرض',
        type: 'rightAligned',
        cellRenderer: (params) => {
          return `<button class ="btn btn-success">عرض </button>`;
        },
        onCellClicked: (p) => {
          this.open = true;
          this.item = p.data;
        }
      },
      {
        field: 'unit',
        headerName: 'الوحدة',
        type: 'rightAligned',
        cellRenderer: (p) => {
          return p.data.unitNavigation.name;
        },
      },
      { field: 'name', headerName: 'اسم الصنف', type: 'rightAligned', filter:true},
      { field: 'price', headerName: 'سعر البيع', type: 'rightAligned' },
      { field: 'quentity', headerName: 'الكمية', type: 'rightAligned' },
    ];
  }

  ngOnInit() {}
  newOpenValue(event) {
    this.open = event;
  }
  changeOnItem(event: { item: Item; isDeleted: boolean; isEdited: boolean }) {
    if (event.isDeleted) {
      this.rowData = this.rowData.filter((p) => p.id !== event.item.id);
    }
    if (event.isEdited) {
      this.rowData = this.rowData.filter((p) => p.id !== +event.item.id);
      this.rowData.push(event.item);
      this.rowData = this.rowData.reverse();
    }
  }
}
