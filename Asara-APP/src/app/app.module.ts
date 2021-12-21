import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RolesResolver } from 'src/resolver/roles.resolver';
import { JwtInterceptor } from 'src/_helpers/jwt.Interceptor';
import { ErrorInterceptor } from 'src/_helpers/error.interceptor';
import { AdminRoleResolver } from 'src/resolver/adminRole.resolver';
import { MemberEditResolver } from 'src/resolver/memberEdit.resolver';
import { MemberEditComponent } from './user/member-edit/member-edit.component';
import { AgGridModule } from 'ag-grid-angular';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { MembersEditResolver } from 'src/resolver/membersEdit.resolver';
import { ListItemComponent } from './item/list-item/list-item.component';
import { AddBillComponent } from './bill/add-bill/add-bill.component';
import { ItemsResolver } from 'src/resolver/items.resolver';
import { NavComponent } from './nav/nav.component';
import { AddStockBillComponent } from './stock/add-stock-bill/add-stock-bill.component';
import { BarranItemMonthlyComponent } from './item/barran-item-monthly/barran-item-monthly.component';
import { BarrenItemDailyComponent } from './item/barren-item-daily/barren-item-daily.component';
import { BarrenDailyResolver } from 'src/resolver/barrenDaily.resolver';
import { BarrenMonthlyResolver } from 'src/resolver/barrenMonthly.resolver';
import { MomentModule } from 'ngx-moment';
import 'ag-grid-enterprise';
import { MonitorDailyComponent } from './stock/monitor-daily/monitor-daily.component';
import { MonitorMonthlyComponent } from './stock/monitorMonthly/monitorMonthly.component';
import { MonitorDailyResolver } from 'src/resolver/monitorDaily.resolver';
import { MonitorMonthlyResolver } from 'src/resolver/monitorMonthly.resolver';
import { AlertifyService } from 'src/service/alterify.service';
import { RetreiveBillComponent } from './bill/retreive-bill/retreive-bill.component';
import { EditItemComponent } from './item/edit-item/edit-item.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddUnitComponent } from './unit/add-unit/add-unit.component';
import { UnitResolver } from 'src/resolver/unit.resolver';
import { ListUnitsComponent } from './unit/list-units/list-units.component';
import { EditUnitComponent } from './unit/edit-unit/edit-unit.component';
import { ListBillComponent } from './expenses/list-bill/list-bill.component';
import { DetailBillComponent } from './expenses/detail-bill/detail-bill.component';
import { AddExpensesComponent } from './expenses/add-expenses/add-expenses.component';
import { ExtraExpensesComponent } from './expenses/extra-expenses/extra-expenses.component';
import { AccountComponent } from './user/account/account.component';
import { ExtraExpensesMonthlyResolver } from 'src/resolver/extraExpensesMonthly.resolver';
import { ExtraExpensesDailyResolver } from 'src/resolver/extraExpensesDaily.resolver';
import { ShopComponent } from './shop/shop.component';
import { ShopResolver } from 'src/resolver/shop.resolver';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { ListStockBillComponent } from './stock/list-stock-bill/list-stock-bill.component';
import { DetailStockBillComponent } from './stock/detail-stock-bill/detail-stock-bill.component';
import { RetreiveStockBillComponent } from './stock/retreive-stock-bill/retreive-stock-bill.component';
import { DisplayBarrenComponent } from './item/display-barren/display-barren.component';
import { PreventSaveChangesGuard } from 'src/guards/prevent-save-changes.guard';

@NgModule({
  declarations: [	
    AppComponent,
    AddItemComponent,
    LoginComponent,
    RegisterComponent,
    MemberEditComponent,
    ListUsersComponent,
    ListItemComponent,
    AddBillComponent,
    NavComponent,
    AddStockBillComponent,
    BarranItemMonthlyComponent,
    BarrenItemDailyComponent,
    MonitorDailyComponent,
    MonitorMonthlyComponent,
    RetreiveBillComponent,
    EditItemComponent,
    EditUserComponent,
    AddUnitComponent,
    ListUnitsComponent,
    EditUnitComponent,
    ListBillComponent,
    DetailBillComponent,
    AddExpensesComponent,
    ExtraExpensesComponent,
    AccountComponent,
    ShopComponent,
    ProgramDetailComponent,
    RetreiveBillComponent,
    ListStockBillComponent,
    DetailStockBillComponent,
    RetreiveStockBillComponent,
    DisplayBarrenComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    MomentModule
  ],
  providers: [
    AdminRoleResolver,
    RolesResolver,
    MemberEditResolver,
    MembersEditResolver,
    ItemsResolver,
    BarrenDailyResolver,
    BarrenMonthlyResolver,
    MonitorDailyResolver,
    MonitorMonthlyResolver,
    AlertifyService,
    UnitResolver,
    ExtraExpensesMonthlyResolver,
    ExtraExpensesDailyResolver,
    ShopResolver,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    PreventSaveChangesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
