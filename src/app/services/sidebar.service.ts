import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  /*
  menu:any[]=[
    {
      titulo:'Dashboard',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo:'Main',url:'/'},
        {titulo:'ProgressBar',url:'progress'},
        {titulo:'Graficas',url:'grafica-one'},
        {titulo:'Promesas',url:'promesas'},
        {titulo:'Rxjs',url:'rxjs'}
      ]
    },
    {
      titulo:'Mantenimientos',
      icono:'mdi mdi-folder-lock-open',
      submenu:[
        {titulo:'Usuarios',url:'usuarios'},
        {titulo:'Hospitales',url:'hospitales'},
        {titulo:'Medicos',url:'medicos'}
      ]
    }
  ];
  */
  public menu:any[] =[];
  
  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu') ?? '') || [];
  }

  getMenu(){
    return JSON.parse(localStorage.getItem('menu') ?? '') || [];
  }
}
