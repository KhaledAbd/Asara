import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/service/alterify.service';
import { AuthService } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  public gridOptions: GridOptions;
  public rowData: any[];
  public columnDefs: any[];
  getRowNodeId: (data: any) => any;
  open = false;
  user: User;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService,
              private authService: AuthService, private alertify: AlertifyService) {
    this.getRowNodeId = (data) => data.id;
    this.route.data.subscribe(d => {
      this.rowData = d.users;
    });
    this.gridOptions = ({
          onGridReady: () => {
              this.gridOptions.api.sizeColumnsToFit();
          },
      } as GridOptions);
    this.columnDefs = [
          { field: 'knownAs', headerName: 'اسم الشُهرة', type: 'rightAligned' },
          { field: 'username', headerName: 'اسم المُستخدم', type: 'rightAligned'},
          { field: 'city', headerName: 'المدينة', type: 'rightAligned' },
          {
            field: 'dateOfBirth', headerName: 'تاريخ الميلاد', type: 'rightAligned',
            cellRenderer: (data) => {
              if (data.value) {
                return moment(data.value).format('DD-MM-YYYY');
              }
            }
          },
          {field: 'id', headerName: 'عرض', type: 'rightAligned', cellRenderer: params => {
            const user: User =  params.data;
            return `<button class ="btn btn-success">عرض</button>`;
          },
          onCellClicked: p => {
             this.user = p.data;
             this.open = true;
          }
          }
      ];
  }
  ngOnInit() {
  }
  setOpen(event: boolean){
    this.open = event;
  }
  userEdit(user: {user: User, isDeleted: boolean}){
    if (user.isDeleted){
      this.rowData = this.rowData.filter(u => user.user.id !== +u.id);
    }
  }

}
