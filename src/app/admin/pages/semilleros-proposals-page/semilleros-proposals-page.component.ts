import { Component, inject } from '@angular/core';
import { SeedbedsService } from '../../services/seedbeds.service';

@Component({
  selector: 'app-semilleros-proposals-page',
  templateUrl: './semilleros-proposals-page.component.html',
  styleUrl: './semilleros-proposals-page.component.css'
})
export class SemillerosProposalsPageComponent {
  private seedbedsService = inject(SeedbedsService);

  semilleros: any[] = [];

  ngOnInit(): void {
    this.seedbedsService.getSeedbeds()
      .subscribe( data => this.semilleros = data );
  }
}
