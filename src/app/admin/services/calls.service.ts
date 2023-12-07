import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  public convocatorias = [
    {
      "id": 1,
      "nombre": "Convocatoria 2020 - Semestre 2",
      "fechaInicio": "2020-10-15T00:00:00.000+00:00",
      "fechaFin": "2020-12-11T00:00:00.000+00:00",
      "fechaResultados": "2020-12-21T00:00:00.000+00:00",
      "estado": false,
    },
    {
      "id": 2,
      "nombre": "Convocatoria 2021 - Semestre 1",
      "fechaInicio": "2021-3-15T00:00:00.000+00:00",
      "fechaFin": "2021-5-11T00:00:00.000+00:00",
      "fechaResultados": "2021-5-21T00:00:00.000+00:00",
      "estado": false,
    },
    {
      "id": 3,
      "nombre": "Convocatoria 2021 - Semestre 2",
      "fechaInicio": "2021-9-T00:00:00.000+00:00",
      "fechaFin": "2021-12-11T00:00:00.000+00:00",
      "fechaResultados": "2020-12-21T00:00:00.000+00:00",
      "estado": false,
    },
    {
      "id": 4,
      "nombre": "Convocatoria 2022 - Semestre 1",
      "fechaInicio": "2022-4-15T00:00:00.000+00:00",
      "fechaFin": "2022-5-11T00:00:00.000+00:00",
      "fechaResultados": "2022-5-21T00:00:00.000+00:00",
      "estado": false,
    },
    {
      "id": 5,
      "nombre": "Convocatoria 2022 - Semestre 2",
      "fechaInicio": "2022-10-15T00:00:00.000+00:00",
      "fechaFin": "2022-12-11T00:00:00.000+00:00",
      "fechaResultados": "2022-12-21T00:00:00.000+00:00",
      "estado": false,
    }
  ];

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  addCall( data: any ) {
    console.log(data);
    const { fechaInicio, fechaFin, fechaResultados } = data;
    const convocatoria = this.generarNombreConvocatoria(fechaInicio, fechaFin, fechaResultados); 
    
    this.convocatorias.push(convocatoria);
  }

  generarNombreConvocatoria(fechaInicio: any, fechaFin: any, fechaResultados: any) {
    // Obtener el año de la fecha de inicio
    const año = new Date(fechaInicio).getFullYear();

    // Obtener el semestre basado en la fecha de inicio
    const mesInicio = new Date(fechaInicio).getMonth() + 1;
    const semestre = mesInicio <= 6 ? 1 : 2;

    // Construir el nombre de la convocatoria
    const nombreConvocatoria = `Convocatoria ${año} - Semestre ${semestre}`;
    const id = this.convocatorias.length + 1;
    // Crear el objeto con la información
    const convocatoria = {
        id,
        nombre: nombreConvocatoria,
        fechaInicio: new Date(fechaInicio).toString(),
        fechaFin: new Date(fechaFin).toString(),
        fechaResultados: new Date(fechaResultados).toString(),
        estado: false
    };

    return convocatoria;
  }

  getCalls() {
    return this.convocatorias;
  }

  getCallById( id: number ) {
    return of(this.convocatorias.find( convocatoria => convocatoria.id == id ));
  }

  updateCall( data: any ) {
    const convocatoria = this.convocatorias.find( convocatoria => convocatoria.id == data.id );
    if(convocatoria) {
      convocatoria.fechaInicio = data.fechaInicio;
      convocatoria.fechaFin = data.fechaFin;
      convocatoria.fechaResultados = data.fechaResultados;
    }
  }
  /*addCall( data: any ): Observable<boolean> {
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
  */
  
}
