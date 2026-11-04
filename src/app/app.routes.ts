import { Routes } from '@angular/router';

import { Dashboard } from './componentes/dashboard/dashboard';

import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario';

import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion';

import { authGuard } from './servicios/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full'
  },

  {
    path: 'registro',
    component: RegistroUsuarioComponent
  },

  {
    path: 'login',
    component: InicioSesionComponent
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'registro'
  }

];