import { Component, inject } from '@angular/core';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'app-teachers-proposals-page',
  templateUrl: './teachers-proposals-page.component.html',
  styleUrl: './teachers-proposals-page.component.css'
})
export class TeachersProposalsPageComponent {

  private teacher = inject(TeachersService);
  profesores: any[] = [];

  ngOnInit(): void {
    this.teacher.getTeachers()
      .subscribe( data => this.profesores = data ); 
  }

}
