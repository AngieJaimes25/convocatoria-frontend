import { Component, inject } from '@angular/core';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-materias-proposals-page',
  templateUrl: './materias-proposals-page.component.html',
  styleUrl: './materias-proposals-page.component.css'
})
export class MateriasProposalsPageComponent {

  private subjectsService = inject(SubjectsService);
  subjects: any[] = [];

  ngOnInit(): void {
    this.subjectsService.getSubjects()
      .subscribe( data => this.subjects = data );
  }
}
