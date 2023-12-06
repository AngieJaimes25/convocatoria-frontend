import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ListProposalsPageComponent } from './pages/list-proposals-page/list-proposals-page.component';
import { AddCallPageComponent } from './pages/add-call-page/add-call-page.component';
import { HistoryCallPagesComponent } from './pages/history-call-pages/history-call-pages.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'convocatorias', 
        children: [
          { path: '', component: AddCallPageComponent },
          { path: 'historial', component: HistoryCallPagesComponent },
          { path: '**', redirectTo: '' }
        ]
      },
      { path: 'propuestas', component: ListProposalsPageComponent },
      { path: '**', redirectTo: 'convocatorias' }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
