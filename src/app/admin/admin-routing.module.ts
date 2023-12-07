import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ListProposalsPageComponent } from './pages/list-proposals-page/list-proposals-page.component';
import { AddCallPageComponent } from './pages/add-call-page/add-call-page.component';
import { HistoryCallPagesComponent } from './pages/history-call-pages/history-call-pages.component';
import { EditProposalsComponent } from './pages/edit-proposals/edit-proposals.component';
import { MateriasProposalsPageComponent } from './pages/materias-proposals-page/materias-proposals-page.component';
import { TeachersProposalsPageComponent } from './pages/teachers-proposals-page/teachers-proposals-page.component';
import { SemillerosProposalsPageComponent } from './pages/semilleros-proposals-page/semilleros-proposals-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'convocatorias', 
        children: [
          { path: '', component: AddCallPageComponent },
          { path: 'editar/:id', component: AddCallPageComponent },
          { path: 'historial', component: HistoryCallPagesComponent },
          { path: '**', redirectTo: '' }
        ]
      },
      { path: 'propuestas',
        children: [
          { path: '', component: ListProposalsPageComponent },
          { path: 'editar/:id', component: EditProposalsComponent },
          { path: 'materias', component: MateriasProposalsPageComponent },
          { path: 'profesores', component: TeachersProposalsPageComponent },
          { path: 'semilleros', component: SemillerosProposalsPageComponent },
        ]
      },
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
