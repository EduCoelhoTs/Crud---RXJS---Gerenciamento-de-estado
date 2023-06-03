import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';

import { ListaRoutingModule } from './lista-routing.module';
import { ListaComponent } from './lista.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    ListaRoutingModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule
  ]
})
export class ListaModule { }
