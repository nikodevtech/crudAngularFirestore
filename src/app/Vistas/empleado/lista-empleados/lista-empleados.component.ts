import { Component } from '@angular/core';
import { Empleado } from 'src/app/Modelos/empleado';
import { DatabaseService } from 'src/app/Servicios/database.service';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent {

  listaEmpleados: Empleado[] = [];

  constructor(
    private _databaseService: DatabaseService,
    private _notificacionesService: NotificacionesService
    ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  /**
   * Obtiene todos los empleados registrados en firebase con dicho servicio
   * @returns suscripcion al observable
   */
  getEmpleados() {
    this._databaseService.obtenerTodos('empleados').subscribe((empleados) => {
      this.listaEmpleados = empleados;
    })
  }

  /**
   * Elimina un empleado llamando al servicio para confirmar la eliminación
   * @param id del empleado a eliminar
   * @param dni del empleado para notificarlo
   */
  eliminarEmpleado(id: string, dni: string) {
    this._notificacionesService.confirmarEliminar(id, dni, 'empleado', 'empleados');
  }

}
