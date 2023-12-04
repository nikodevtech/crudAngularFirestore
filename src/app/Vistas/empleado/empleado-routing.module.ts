import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorEmpleadoComponent } from './contenedor-empleado/contenedor-empleado.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { DetalleEmpleadosComponent } from './detalle-empleados/detalle-empleados.component';

const routes: Routes = [
  {path: '', component: ContenedorEmpleadoComponent},
  {path: 'listado', component: ListaEmpleadosComponent},
  {path: 'editar/:id', component: DetalleEmpleadosComponent},
  {path: 'crear', component: DetalleEmpleadosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
