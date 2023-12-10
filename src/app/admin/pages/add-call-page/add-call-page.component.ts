import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CallsService } from '../../services/calls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-call-page',
  templateUrl: './add-call-page.component.html',
  styleUrl: './add-call-page.component.css',
  providers: [MessageService]
})
export class AddCallPageComponent {
  private fb             = inject( FormBuilder );
  private callsService   = inject( CallsService );
  private router         = inject( Router );
  private messageService = inject( MessageService );
  private activatedRoute = inject( ActivatedRoute );

  public myForm: FormGroup = this.fb.group({
    id: [],
    fechaInicio: ['', [ Validators.required ]],
    fechaFin: ['', [ Validators.required ]],
    fechaResultados: ['', [ Validators.required ]],
  });

  ngOnInit(): void {

    if ( !this.router.url.includes('editar') ) return;
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.callsService.getCallOpen() ),
      ).subscribe( convocatoria => {
        if ( !convocatoria ) {
          return this.router.navigateByUrl('/');
        }
        const data = {
          id: convocatoria.id,
          fechaInicio: new Date(convocatoria.fechaInicio),
          fechaFin: new Date(convocatoria.fechaFin),
          fechaResultados: new Date(convocatoria.fechaResultados),
        }
        this.myForm.reset( data );
        return;
      }); 

  }

  isValidField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  toHistory() {
    this.router.navigateByUrl('/admin/convocatorias/historial');
  }

  submit() {
    if(!this.myForm.valid) {
      return this.myForm.markAllAsTouched();
    }
    const data = this.myForm.value;
    if(this.myForm.value.id){
      this.callsService.updateCall(data)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha editado la convocatoria' });
            this.myForm.reset();
          },
          error: (error) => {
            if(error.status === 200) {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha editado la convocatoria' });
              this.myForm.reset();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido editar la convocatoria' });
            }
          }
        });
    } else {
      this.callsService.addCall(data)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha abierto una convocatoria' });
            this.myForm.reset();
          },
          error: (error) => {
            if(error.status === 200) {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha abierto una convocatoria' });
              this.myForm.reset();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido abrir la convocatoria' });
            }
          }
        });
    }
  }
}
