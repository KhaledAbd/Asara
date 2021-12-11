import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminRoleResolver } from 'src/resolver/adminRole.resolver';
import { BarrenDailyResolver } from 'src/resolver/barrenDaily.resolver';
import { BarrenMonthlyResolver } from 'src/resolver/barrenMonthly.resolver';
import { ExtraExpensesDailyResolver } from 'src/resolver/extraExpensesDaily.resolver';
import { ExtraExpensesMonthlyResolver } from 'src/resolver/extraExpensesMonthly.resolver';
import { ItemsResolver } from 'src/resolver/items.resolver';
import { MemberEditResolver } from 'src/resolver/memberEdit.resolver';
import { MembersEditResolver } from 'src/resolver/membersEdit.resolver';
import { MonitorDailyResolver } from 'src/resolver/monitorDaily.resolver';
import { MonitorMonthlyResolver } from 'src/resolver/monitorMonthly.resolver';
import { ShopResolver } from 'src/resolver/shop.resolver';
import { UnitResolver } from 'src/resolver/unit.resolver';
import { AddBillComponent } from './bill/add-bill/add-bill.component';
import { ExtraExpensesComponent } from './expenses/extra-expenses/extra-expenses.component';
import { ListBillComponent } from './expenses/list-bill/list-bill.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { BarranItemMonthlyComponent } from './item/barran-item-monthly/barran-item-monthly.component';
import { BarrenItemDailyComponent } from './item/barren-item-daily/barren-item-daily.component';
import { ListItemComponent } from './item/list-item/list-item.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { ShopComponent } from './shop/shop.component';
import { AddStockBillComponent } from './stock/add-stock-bill/add-stock-bill.component';
import { ListStockBillComponent } from './stock/list-stock-bill/list-stock-bill.component';
import { MonitorDailyComponent } from './stock/monitor-daily/monitor-daily.component';
import { MonitorMonthlyComponent } from './stock/monitorMonthly/monitorMonthly.component';
import { ListUnitsComponent } from './unit/list-units/list-units.component';
import { AccountComponent } from './user/account/account.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { LoginComponent } from './user/login/login.component';
import { MemberEditComponent } from './user/member-edit/member-edit.component';
import { RegisterComponent } from './user/register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
    children: [
      { path: '', component: ListItemComponent },
      { path: 'item', component: AddItemComponent },
      { path: 'listitems', component: ListItemComponent },
      { path: 'register', component: RegisterComponent, resolve: { roles: AdminRoleResolver } },
      { path: 'edituser', component: MemberEditComponent, resolve: { user: MemberEditResolver } },
      { path: 'listusers', component: ListUsersComponent, resolve: { users: MembersEditResolver } },
      { path: 'addbill/:id', component: AddBillComponent, resolve: {items: ItemsResolver, shop: ShopResolver } },
      { path: 'addstock/:id', component: AddStockBillComponent, resolve: { user: MemberEditResolver, items: ItemsResolver } },
      { path: 'barrenmonthly', component: BarranItemMonthlyComponent,
        resolve: { barrenItems: BarrenMonthlyResolver, expenses: ExtraExpensesMonthlyResolver } },
      { path: 'barrendaily', component: BarrenItemDailyComponent,
        resolve: { barrenItems: BarrenDailyResolver, expenses: ExtraExpensesDailyResolver } },
      {
        path: 'monitordaily', component: MonitorDailyComponent, resolve: {
          monitorItems: MonitorDailyResolver, roles: AdminRoleResolver
        }
      },
      {
        path: 'monitormonthly', component: MonitorMonthlyComponent, resolve: {
          monitorItems: MonitorMonthlyResolver,
          roles: AdminRoleResolver
        }
      },
      { path: 'units', component: ListUnitsComponent, resolve: { units: UnitResolver } },
      { path: 'expenses', component: ListBillComponent  , resolve: { user: MemberEditResolver}},
      { path: 'extraexpenses', component: ExtraExpensesComponent  , resolve: { user: MemberEditResolver}},
      { path: 'account', component: AccountComponent  , resolve: { user: MemberEditResolver}},
      { path: 'shop', component: ShopComponent  , resolve: { shop: ShopResolver}},
      { path: 'programdetail', component: ProgramDetailComponent},
      { path: 'stockbilllist', component: ListStockBillComponent},

    ]
  },
  { path: '**', component: LoginComponent, pathMatch: 'full', canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
