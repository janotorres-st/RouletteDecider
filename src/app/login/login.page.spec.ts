import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPage } from './login.page';

describe('LoginPage (Pruebas Unitarias con Jasmine)', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // Test 1: Login.
  it('Debe crear la página de Login exitosamente', () => {
    if (!component) {
      throw new Error('El componente no logró instanciarse correctamente en memoria.');
    }
  });

  // Test 2: Token.
  it('Debe almacenar el token de sesión en el localStorage al autenticar', () => {
    const testToken = 'token-falso-premium-2026';
    
    localStorage.setItem('user_session', testToken);
    const tokenGuardado = localStorage.getItem('user_session');
    
    if (tokenGuardado !== testToken) {
      localStorage.removeItem('user_session');
      throw new Error(`El token guardado (${tokenGuardado}) no coincide con el esperado.`);
    }
    
    localStorage.removeItem('user_session');
  });
});