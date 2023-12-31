import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthStatus } from '../interfaces/auth-status.enum';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<string|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  //! Al mundo exterior
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );


  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: string, token:string): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);
    return true;
  }

  login( codigo: string, email: string, contrasenia: string ): Observable<boolean> {
    const url  = `${ this.baseUrl }/login`;
    const body = { codigo, email, contrasenia };
    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map(({ Username, token }) => this.setAuthentication(Username, token)),
      catchError(err => {
        console.error('Error en la solicitud:', err);  // Log del error en la consola
        return throwError(() => err.error.Message);
      })
    );
  }

  register( codigo: string, email: string, password: string ): Observable<boolean> {
    let url = 'usuario/guardarProponente';
    if(codigo.startsWith(`0`)){
      url  = `${ this.baseUrl }/usuario/guardarEvaluador`;
    }
    
    const body = { codigo, email, password };
    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ Username, token }) => this.setAuthentication( Username, token )),
        catchError( err => throwError( () => err.error.message ))
      );
  }

  resetPassword( email: String ):Observable<any> {
    const url  = `${ this.baseUrl }/usuario/reestablecerContrasenia?email=${email}`;
    return this.http.post<LoginResponse>(url, null);
  }

  checkAuthStatus():Observable<boolean> {
    const token = localStorage.getItem('token');
    if ( !token ) {
      this.logout();
      return of(false);
    }
    // Falta verificar token en el backend
    return of(true);
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
  }
}
