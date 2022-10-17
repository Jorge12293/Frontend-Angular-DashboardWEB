import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems:any[]=[];

  constructor(
    private usuarioService:UsuarioService,
    private router:Router,
    private sidebarService:SidebarService) { 
    this.menuItems=this.sidebarService.menu;
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
