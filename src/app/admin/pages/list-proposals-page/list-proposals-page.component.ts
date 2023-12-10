import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalsService } from '../../services/proposals.service';

@Component({
  selector: 'app-list-proposals-page',
  templateUrl: './list-proposals-page.component.html',
  styleUrl: './list-proposals-page.component.css'
})
export class ListProposalsPageComponent {
  private router           = inject( Router );
  private proposalsService = inject(ProposalsService);

  propuestasDeMaterias: any[] = [];
  propuestasDeSemillero: any[] = [];

  ngOnInit(): void {
    //this.propuestasDeMaterias = this.proposalsService.getProposalsMaterias();
    this.propuestasDeSemillero = this.proposalsService.getProposalsSemilleros();

    this.proposalsService.getProposals()
      .subscribe({
        next: ( data ) => {
          this.propuestasDeMaterias = data.filter(d => d.tipo == "M");
          this.propuestasDeSemillero = data.filter(d => d.tipo == "S");
        }
      })
  }

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
