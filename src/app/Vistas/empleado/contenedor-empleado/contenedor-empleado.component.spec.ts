import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorEmpleadoComponent } from './contenedor-empleado.component';

describe('ContenedorEmpleadoComponent', () => {
  let component: ContenedorEmpleadoComponent;
  let fixture: ComponentFixture<ContenedorEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenedorEmpleadoComponent]
    });
    fixture = TestBed.createComponent(ContenedorEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
