import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/Modelos/empleado';
import { DatabaseService } from 'src/app/Servicios/database.service';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';

@Component({
  selector: 'app-detalle-empleados',
  templateUrl: './detalle-empleados.component.html',
  styleUrls: ['./detalle-empleados.component.css'],
})
export class DetalleEmpleadosComponent {
  createEmpleado: FormGroup; //Representa el formulario
  submitted = false; // Para controlar si el formulario ha sido enviado y si es invalido poder dar info
  loading = false; //Para poder controlar cuando mostrar el spinner de bootstrap
  id: string | null; //Para recibir el id como param para editar o null para crear
  titulo = 'Registrar nuevo empleado';
  textoButton = 'Registrar';

  constructor(
    private formBuilder: FormBuilder, //Dependencia para form reactivo
    private _databaseService: DatabaseService,
    private router: Router, //Dependecia para navegar entre rutas
    private route: ActivatedRoute, //Dependencia para acceder al id por la ruta
    private _notificacionesService: NotificacionesService //Dependencia para mostrar mensajes
  ) {
    // Inicializa el formulario con formBuilder y define campos con validadores
    this.createEmpleado = this.formBuilder.group({
      //crea un FormGroup con estos campos
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      salario: ['', Validators.required],
    });
    this.id = this.route.snapshot.paramMap.get('id'); //capturamos el id de la url
  }

  ngOnInit(): void {
    this.esEditar();
  }

  /**
   * Gestiona la lógica si hay que agregar o editar un empleado en Firebase
   * dependiendo de si el id es null o no.
   */
  agregarEditarEmpleado(): void {
    this.submitted = true;
    //Con este condicional si falta algun dato requerido en el formulario no se crea el empleado
    if (this.createEmpleado.invalid) {
      return;
    }
    // Si el formulario es valido, se crea o se actualiza el empleado
    if (this.id === null) {
      this.registrarEmpleado();
    } else {
      this.editarEmpleado();
    }
  }

  /**
   * Actualiza la información de un empleado existente en Firebase.
   * @param id del empleado
   * @remarks Se extraen los datos del formulario y se actualiza el empleado con el ID proporcionado.
   * La fecha de actualización se establece en la fecha actual.
   * Muestra un mensaje de éxito y redirige a la lista de usuarios.
   */
  editarEmpleado() {
    this.loading = true;

    const empleado: Empleado = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      dni: this.createEmpleado.value.dni,
      salario: this.createEmpleado.value.salario,
    };

    this._databaseService
      .actualizar('empleados', empleado)
      .then(() => {
        this.loading = false;
        // Verifica si realmente se ha modificado algo antes de mostrar la notificación
        if (this.createEmpleado.dirty) {
          this._notificacionesService.notificacionModificacion('empleado');
        }
        this.router.navigate(['/empleados/listado']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  /**
   * Agrega un nuevo empleado
   * @remarks
   * Se crea un objeto empleado con los datos del formulario y se llama al servicio para agregarlo a Firebase.
   * Muestra un mensaje de éxito, detiene la carga y redirige a la lista de empleados.
   */
  registrarEmpleado() {
    this.loading = true;
    const empleado: Empleado = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      dni: this.createEmpleado.value.dni,
      salario: this.createEmpleado.value.salario,
    };
    this._databaseService
      .insertar('empleados', empleado)
      .then(() => {
        this._notificacionesService.notificacionRegistrar('empleado');
        this.loading = false;
        this.router.navigate(['/empleados/listado']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  /**
   * Verifica si se esta editando o creando un nuevo empleado
   * para mostrar los campos del form con los datos correspondientes
   */
  esEditar() {
    if (this.id !== null) {
      this.loading = true;
      this.textoButton = 'Editar';
      this.titulo = 'Editar empleado';
      this._databaseService
        .obtenerPorId('empleados', this.id)
        .subscribe((respuesta) => {
          this.loading = false;
          this.createEmpleado.setValue({
            nombre: respuesta.nombre,
            apellido: respuesta.apellido,
            dni: respuesta.dni,
            salario: respuesta.salario,
          });
        });
    }
  }
}
