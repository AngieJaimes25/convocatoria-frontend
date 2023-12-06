import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CallsService } from '../../services/calls.service';

@Component({
  selector: 'app-history-call-pages',
  templateUrl: './history-call-pages.component.html',
  styleUrl: './history-call-pages.component.css'
})
export class HistoryCallPagesComponent {

  private callsService = inject( CallsService );
  private router       = inject( Router );

  convocatorias: any[] = [
    {
      "id": 1,
      "nombre": "Convocatoria 2020 - Semestre 2",
      "fechaInicio": "2020-10-15T00:00:00.000+00:00",
      "fechaFin": "2020-12-11T00:00:00.000+00:00",
      "fechaResultados": "2020-12-21T00:00:00.000+00:00",
      "estado": false,
    }
  ];

  ngOnInit(): void {
    this.callsService.getCalls()
      .subscribe( data => this.convocatorias = data);

    this.convocatorias = [
      {
        "id": 1,
        "nombre": "Convocatoria 2020 - Semestre 2",
        "fechaInicio": "2020-10-15T00:00:00.000+00:00",
        "fechaFin": "2020-12-11T00:00:00.000+00:00",
        "fechaResultados": "2020-12-21T00:00:00.000+00:00",
        "estado": false,
      }
    ];
  }

  ver(id:number) {
    this.router.navigateByUrl(`admin/convocatoria/ver/${id}`);
  }
}
