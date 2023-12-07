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

  convocatorias: any[] = [];

  ngOnInit(): void {
    /* this.callsService.getCalls()
      .subscribe( data => this.convocatorias = data); */
    this.convocatorias = this.callsService.getCalls();
  }

  ver(id:number) {
    this.router.navigateByUrl(`admin/convocatorias/editar/${id}`);
  }
}
