import { Component } from '@angular/core';

@Component({
  selector: 'app-list-proposals-page',
  templateUrl: './list-proposals-page.component.html',
  styleUrl: './list-proposals-page.component.css'
})
export class ListProposalsPageComponent {
  propuestasDeMaterias: any[] = [];
  propuestasDeSemillero: any[] = [];
}
