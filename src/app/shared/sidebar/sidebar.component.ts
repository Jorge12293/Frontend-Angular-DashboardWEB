import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public usuario!:Usuario;
  menuItems:any[]=[];

  constructor(
    private usuarioService:UsuarioService,
    private router:Router,
    public sidebarService:SidebarService) { 
    this.menuItems=this.sidebarService.menu;
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {}

  logout(){
    try {
      this.usuarioService.logout();
    } catch (error) {
      this.router.navigateByUrl('/login');
    }
  
  }

}
