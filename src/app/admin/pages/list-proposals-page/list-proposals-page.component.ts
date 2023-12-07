import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-proposals-page',
  templateUrl: './list-proposals-page.component.html',
  styleUrl: './list-proposals-page.component.css'
})
export class ListProposalsPageComponent {
  private router = inject( Router );
  
  propuestasDeMaterias: any[] = [];
  propuestasDeSemillero: any[] = [];

  verProfesores() {
    this.router.navigateByUrl('/admin/propuestas/profesores');
  }

  verMaterias() {
    this.router.navigateByUrl('/admin/propuestas/materias');
  }

  verSemilleros() {
    this.router.navigateByUrl('/admin/propuestas/semilleros');
  }

}
