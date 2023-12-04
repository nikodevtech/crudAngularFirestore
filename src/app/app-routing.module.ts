import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './Vistas/Core/bienvenida/bienvenida.component';

const routes: Routes = [
  {path: '', component: BienvenidaComponent},
  {path: 'empleados', loadChildren: () => import('./Vistas/empleado/empleado.module').then(m => m.EmpleadoModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
