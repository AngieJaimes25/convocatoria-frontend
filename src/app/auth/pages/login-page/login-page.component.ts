import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  providers: [MessageService]
})
export class LoginPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );
  private messageService = inject( MessageService );

  public myForm: FormGroup = this.fb.group({
    codigo:   ['1152323', [ Validators.required, Validators.minLength(6) ]],  
    email:    ['gibsonarbeyrb@ufps.edu.co', [ Validators.required, Validators.email ]],
    contrasenia: ['12345678', [ Validators.required, Validators.minLength(6) ]],
  });

  isValidField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  login() {
    if (!this.myForm.valid) return this.myForm.markAllAsTouched();

    const { codigo, email, contrasenia } = this.myForm.value;
    this.authService.login(codigo, email, contrasenia)
      .subscribe({
        next: () => {
          if(codigo.startsWith('1')) {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/user');
          }
        },
        error: (message) => {
          console.log(message);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales incorrectas' });
        }
      });
  }
}
