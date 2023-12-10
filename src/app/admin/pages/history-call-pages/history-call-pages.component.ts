import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CallsService } from '../../services/calls.service';
import { Call } from '../../interfaces/call.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-history-call-pages',
  templateUrl: './history-call-pages.component.html',
  styleUrl: './history-call-pages.component.css',
  providers: [MessageService]
})
export class HistoryCallPagesComponent {

  private callsService   = inject( CallsService );
  private router         = inject( Router );
  private messageService = inject(MessageService);

  calls: Call[] = [];
  callOpen!: Call;

  ngOnInit(): void {
    this.getCalls();
  }

  getCalls() {
    this.callsService.getCalls()
      .subscribe( data => this.calls = data );
    
    this.callsService.getCallOpen()
      .subscribe( data => this.callOpen = data );
  }

  showCall(id:number) {
    this.router.navigateByUrl(`admin/convocatorias/editar/${id}`);
  }

  return() {
    this.router.navigateByUrl('/admin/convocatorias');
  }

  closeCall() {
    this.callsService.closeCall()
    .subscribe({
      next: (response) => {
        this.getCalls();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha cerrado la convocatoria abierta' });
      },
      error: (error) => {
        if(error.status === 200) {
          this.getCalls();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha cerrado la convocatoria abierta' });
        } 
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cerrar la convocatoria' });
        }
      }
    })
  }
}
