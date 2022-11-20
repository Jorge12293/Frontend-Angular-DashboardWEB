import { IfStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit,OnDestroy {
  
  public imgSubs?:Subscription;

  public cargando:boolean=false;
  public totalUsuarios: number=0;
  public usuarios:Usuario[]=[];
  public usuariosTemp:Usuario[]=[];
  public desde:number=0;

  constructor(
    private busquedasService:BusquedasService,
    private usuarioService:UsuarioService,
    private modalImagenService:ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
   this.cargarUsuarios();

  this.imgSubs = this.modalImagenService.nuevaImage
    .pipe(delay(600))
    .subscribe(
      img=>this.cargarUsuarios()
    );

  }


  abrirModal(usuario:Usuario){
    this.modalImagenService.abrirModal('usuarios',usuario.uid ?? '',usuario.img);   
  }

  cambiarPagina(valor:number){
    this.desde+=valor;
    if( this.desde<0 ){
      this.desde=0;
    }else if( this.desde > this.totalUsuarios){
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando=true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(
        ({total,usuarios})=>{
          this.totalUsuarios = total;
          if(usuarios.length !==0){
            this.usuarios = usuarios;
            this.usuariosTemp = usuarios;
          }
          this.cargando=false;
        }
      );
  }

  buscar(termino:string){

    if(termino.length === 0){
      this.usuarios =this.usuariosTemp;
      return;
    }

    this.busquedasService.buscar('usuarios',termino)
    .subscribe((resp:any)=>{
      this.usuarios=resp;
    });
  }
  

  eliminarUsuario(usuario:Usuario){
    
    if(usuario.uid=== this.usuarioService.uid){
      return Swal.fire('Error','No puede borrarse asi mismo','error')
    }

    return Swal.fire({
      title:'Borar Uusario',
      text: `Esta seguro de borrar a ${usuario.nombre}`,
      icon:'question',
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Si, Borrarlo'
    }).then((result)=>{
      if(result.value){
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(
            resp=>{
              Swal.fire(
                'Deleted',
                'Uusaurio Eliminado.',
                'success'
              );
              this.cargarUsuarios();
            }
          );
      }
    });
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService. guardarPerfil(usuario).subscribe(
      resp=>{
        console.log(resp);
      }
    );   
  }

}
