import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { ContenedorEmpleadoComponent } from './contenedor-empleado/contenedor-empleado.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { DetalleEmpleadosComponent } from './detalle-empleados/detalle-empleados.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContenedorEmpleadoComponent,
    ListaEmpleadosComponent,
    DetalleEmpleadosComponent
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmpleadoModule { }
