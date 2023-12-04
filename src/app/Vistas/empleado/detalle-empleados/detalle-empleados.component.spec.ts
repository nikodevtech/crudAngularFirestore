import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEmpleadosComponent } from './detalle-empleados.component';

describe('DetalleEmpleadosComponent', () => {
  let component: DetalleEmpleadosComponent;
  let fixture: ComponentFixture<DetalleEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleEmpleadosComponent]
    });
    fixture = TestBed.createComponent(DetalleEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
