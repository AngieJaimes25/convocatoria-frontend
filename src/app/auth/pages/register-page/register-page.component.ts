import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  providers: [MessageService]
})
export class RegisterPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );
  private messageService = inject( MessageService );

  public myForm: FormGroup = this.fb.group({
    codigo:      ['0', [ Validators.required, Validators.minLength(5) ]],
    email:       ['fernando@google.com', [ Validators.required, Validators.email ]],
    contrasenia: ['123456', [ Validators.required, Validators.minLength(6) ]],
  });

  register() {
    alert('submit');
    if (!this.myForm.valid) return;
    const { codigo, email, contrasenia } = this.myForm.value;

    this.authService.register(codigo, email, contrasenia)
      .subscribe({
        next: () => {
          if(codigo.startWith('0')) {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/user');
          }
        },
        error: (message) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido registrar el usuario' });
        }
      })
  }
}
