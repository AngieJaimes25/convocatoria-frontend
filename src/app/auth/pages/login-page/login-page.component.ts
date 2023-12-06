import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );

  public myForm: FormGroup = this.fb.group({
    codigo:   ['123456', [ Validators.required, Validators.minLength(6) ]],  
    email:    ['fernando@google.com', [ Validators.required, Validators.email ]],
    contrasenia: ['123456', [ Validators.required, Validators.minLength(6) ]],
  });

  login() {
    if (!this.myForm.valid) return;
  
    const { codigo, email, contrasenia } = this.myForm.value;

    this.authService.login(codigo, email, contrasenia)
      .subscribe({
        next: () => {
          if(codigo.startWith('0')) {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/user');
          }
        },
        error: (message) => {
          console.log(message);
          alert('error');
        }
      })
  }
}
