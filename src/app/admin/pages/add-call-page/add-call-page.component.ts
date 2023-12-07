import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CallsService } from '../../services/calls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-call-page',
  templateUrl: './add-call-page.component.html',
  styleUrl: './add-call-page.component.css'
})
export class AddCallPageComponent {
  private fb             = inject( FormBuilder );
  private callsService   = inject( CallsService );
  private router         = inject( Router );
  private activatedRoute = inject( ActivatedRoute );
  private editar: boolean = false;

  public myForm: FormGroup = this.fb.group({
    id: [],
    fechaInicio: ['', [ Validators.required ]],
    fechaFin: ['', [ Validators.required ]],
    fechaResultados: ['', [ Validators.required ]],
  });

  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) return;
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.callsService.getCallById( id ) ),
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
        this.editar = true;
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
      this.callsService.updateCall(data);
    } else {
      this.callsService.addCall(data);
    }
    /* this.callsService.addCall(data)
      .subscribe({
        next: () => {
          alert('Se ha agregado una convocatoria');
        },
        error: (message) => {
          console.log(message);
          alert('error');
        }
      }); */
  }
}
