import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RegistroUsuarioComponent } from './registro-usuario';

describe('RegistroUsuarioComponent', () => {
  let component: RegistroUsuarioComponent;
  let fixture: ComponentFixture<RegistroUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroUsuarioComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroUsuarioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept a name with letters and spaces', () => {
    const nombre = component.registroForm.controls['nombre'];
    nombre.setValue('Ximena Mejía');
    expect(nombre.valid).toBeTrue();
  });

  it('should reject numbers and special characters in the name', () => {
    const nombre = component.registroForm.controls['nombre'];

    nombre.setValue('Ximena123');
    expect(nombre.hasError('pattern')).toBeTrue();

    nombre.setValue('Juan@');
    expect(nombre.hasError('pattern')).toBeTrue();
  });
});
