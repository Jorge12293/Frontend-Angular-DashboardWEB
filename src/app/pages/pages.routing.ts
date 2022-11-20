import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaOneComponent } from './grafica-one/grafica-one.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoUpdateComponent } from './mantenimientos/medicos/medico-update/medico-update.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes =[
  {
    path:'dashboard',
    component:PagesComponent,
    canActivate:[AuthGuard],
    children:[
      {path:'',component:DashboardComponent,data:{titulo:'Dashboard'}},
      {path:'buscar/:termino',component:BusquedaComponent, data:{titulo:'Buscar'}},
      {path:'progress',component:ProgressComponent, data:{titulo:'Progress'}},
      {path:'grafica-one',component:GraficaOneComponent, data:{titulo:'Grafica'}},
      {path:'account-settings',component:AccountSettingsComponent, data:{titulo:'Account Settings'}},
      {path:'promesas',component:PromesasComponent, data:{titulo:'Promesas'}},
      {path:'rxjs',component:RxjsComponent, data:{titulo:'Rxjs'}},
      {path:'perfil',component:PerfilComponent, data:{titulo:'Perfil de Usuario'}},
      
      //Mantenimientos
      {path:'hospitales',component:HospitalesComponent, data:{titulo:'Hopsitales de la Aplicación'}},
      {path:'medicos',component:MedicosComponent, data:{titulo:'Medicos de la Aplicación'}},
      {path:'medico/:id',component:MedicoUpdateComponent, data:{titulo:'Medicos de la Aplicación'}},

      //AdminGuard
      {path:'usuarios',canActivate:[AdminGuard],component:UsuariosComponent, data:{titulo:'Usuario de la Aplicación'}},

    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})

export class PagesRoutingModule { }
