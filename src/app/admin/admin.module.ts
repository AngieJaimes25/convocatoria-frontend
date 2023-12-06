import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddCallPageComponent } from './pages/add-call-page/add-call-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoryCallPagesComponent } from './pages/history-call-pages/history-call-pages.component';
import { ListProposalsPageComponent } from './pages/list-proposals-page/list-proposals-page.component';
import { EditProposalsComponent } from './pages/edit-proposals/edit-proposals.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavbarComponent,
    AddCallPageComponent,
    HistoryCallPagesComponent,
    ListProposalsPageComponent,
    EditProposalsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
