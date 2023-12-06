import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CallsService } from '../../services/calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-call-page',
  templateUrl: './add-call-page.component.html',
  styleUrl: './add-call-page.component.css'
})
export class AddCallPageComponent {
  private fb          = inject( FormBuilder );
  private callsService = inject( CallsService );
  private router      = inject( Router );

  public myForm: FormGroup = this.fb.group({
    fechaInicio: ['', [ Validators.required ]],
    fechaFin: ['', [ Validators.required ]],
    fechaResultados: ['', [ Validators.required ]],
  });

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
    this.callsService.addCall(data)
      .subscribe({
        next: () => {
          alert('Se ha agregado una convocatoria');
        },
        error: (message) => {
          console.log(message);
          alert('error');
        }
      });
  }
}
