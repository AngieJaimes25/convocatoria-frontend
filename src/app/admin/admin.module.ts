import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddCallPageComponent } from './pages/add-call-page/add-call-page.component';
import { ListCallsPageComponent } from './pages/list-calls-page/list-calls-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavbarComponent,
    AddCallPageComponent,
    ListCallsPageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
