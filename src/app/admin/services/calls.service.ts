import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  addCall( data: any ): Observable<boolean> {
    const url  = `${ this.baseUrl }/convocatoria/abrir`;
    return this.http.post( url, data, this.commonOptions)
      .pipe(
        map(() => true),
        catchError(err => throwError(() => err.error.message))
      );
  }

  getCalls(): Observable<any> {
    const url  = `${ this.baseUrl }/convocatoria/listarPasadas`;
    return this.http.get( url, this.commonOptions );
  }
}
