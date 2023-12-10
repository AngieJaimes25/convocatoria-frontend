import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProposalsService {

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

  proposals: any[] = [
    {
      nombre: "Juego interactivo",
      proponente: {
        nombre: "Andres Gelvez",
        codigo: 2112,
      },
      materia: {
        nombre: "Seminario Investigador 2",
        id: 12121,
      },
      semillero: {
        id: null,
      },
      profesor: {
        nombre: "Ana Parada"
      }
    },
    {
      nombre: "Juego interactivo",
      proponente: {
        nombre: "Jairo Alvarez",
        codigo: 2123,
      },
      materia: {
        nombre: "Seminario Investigador 2",
        id: 12121,
      },
      semillero: {
        id: null,
      },
      profesor: {
        nombre: "Ana Parada"
      }
    },
    {
      nombre: "Juego interactivo",
      proponente: {
        nombre: "Andrea Lozano",
        codigo: 2115,
      },
      semillero: {
        id: null,
      },
      materia: {
        nombre: "Seminario Investigador 2",
        id: 12121,
      },
      profesor: {
        nombre: "Ana Parada"
      }
    },
    {
      nombre: "Juego interactivo",
      proponente: {
        nombre: "Andrea Lozano",
        codigo: 2115,
      },
      semillero: {
        id: 88951,
      },
      materia: {
        id: null,
      },
      profesor: {
        nombre: "Ana Parada"
      }
    },
    {
      nombre: "Juego interactivo",
      proponente: {
        nombre: "Jairo Alvarez",
        codigo: 2123,
      },
      materia: {
        id: null,
      },
      semillero: {
        id: 88951,
      },
      profesor: {
        nombre: "Ana Parada"
      }
    },
  ];

  addProposals( data: any ) {
    this.proposals.push( data );
  }

  getProposals(): Observable<any[]> {
    const url  = `${ this.baseUrl }/propuesta/listarAgrupadasPorTipo`;
    return this.http.get<any[]>( url, this.commonOptions );
  } 

  getProposalsMaterias() {
    return this.proposals.filter( proposal => proposal.materia.id != null );
  }

  getProposalsSemilleros() {
    return this.proposals.filter( proposal => proposal.semillero.id != null );
  }
  
}
