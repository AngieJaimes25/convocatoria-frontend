import { NgModule } from '@angular/core';;

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@NgModule({
  exports: [
    ButtonModule,
    CalendarModule,
    InputTextModule,
    PasswordModule,
  ]
})
export class PrimengModule { }
