import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallsService } from '../../services/calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-proposals',
  templateUrl: './edit-proposals.component.html',
  styleUrl: './edit-proposals.component.css'
})
export class EditProposalsComponent {
  private fb           = inject( FormBuilder );
  private callsService = inject( CallsService );
  private router       = inject( Router );

  public myForm: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required ]],
    fechaFin: ['', [ Validators.required ]],
    fechaResultados: ['', [ Validators.required ]],
  });

  isValidField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  submit() {
    if(!this.myForm.valid) {
      return this.myForm.markAllAsTouched();
    }
    const data = this.myForm.value;
    this.callsService.addCall(data);
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
