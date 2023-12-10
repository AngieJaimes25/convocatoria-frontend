import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Call } from '../interfaces/call.interface';

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    console.log(authToken);
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  addCall( call: Call ): Observable<any> {
    const url  = `${ this.baseUrl }/convocatoria/abrir`;
    return this.http.post( url, call, this.commonOptions);
  }
  
  getCalls(): Observable<Call[]> {
    const url  = `${ this.baseUrl }/convocatoria/listarPasadas`;
    return this.http.get<Call[]>( url, this.commonOptions );
  }

  getCallOpen(): Observable<Call> {
    const url  = `${ this.baseUrl }/convocatoria/abierta`;
    return this.http.get<Call>( url, this.commonOptions );
  }
  
  closeCall(): Observable<any> {
    const url  = `${ this.baseUrl }/convocatoria/cerrar`;
    return this.http.get( url, this.commonOptions );
  }

  updateCall( call: Call ): Observable<any> {
    const url  = `${ this.baseUrl }/convocatoria/modificar`;
    return this.http.put( url, call, this.commonOptions );
  }
}
