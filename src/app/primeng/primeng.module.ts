import { NgModule } from '@angular/core';;

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';

@NgModule({
  exports: [
    ButtonModule,
    CalendarModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    TableModule
  ]
})
export class PrimengModule { }
