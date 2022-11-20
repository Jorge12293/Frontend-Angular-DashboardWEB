import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public usuario!:Usuario;

  constructor(
    private usuarioService:UsuarioService,
    private router:Router) {
    
      this.usuario= usuarioService.usuario;
   }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }

  buscar(termino: string){1
    if(termino.length===0){
      this.router.navigateByUrl('/dashboard');
    }else{
      this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
    }
  }

}
