import { NgModule } from '@angular/core';;

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports: [
    ButtonModule,
    CalendarModule,
    DialogModule,
    DividerModule,
    InputTextModule,
    PasswordModule,
    TableModule,
    ToastModule
  ]
})
export class PrimengModule { }
