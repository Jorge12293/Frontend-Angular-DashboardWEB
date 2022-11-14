import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm!:FormGroup;
  public usuario!:Usuario;
  public imagenSubir!:File;
  public imgTemp!:any;

  constructor(
    private fb:FormBuilder,
    private usuarioService:UsuarioService,
    private fileUploadServices:FileUploadService) { 

    this.usuario =this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm=this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      email:[this.usuario.email,[Validators.required,Validators.email]]
    });
  }

  cambiarImagen($event:any){
    let file = $event.target.files[0];

    if(!file){
      return this.imgTemp=null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend=()=>{
      this.imgTemp=reader.result;
    }

    if(file != undefined || file!=null){
      console.log(file);
      this.imagenSubir=file;
    }else{
      this.imagenSubir=file;
    } 
    return true;   
  }


  subirImagen(){
    this.fileUploadServices.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid ||'')
    .then(img=>{
      this.usuario.img=img;
      Swal.fire('Guardado','Actualizada Imagen','success');
    })
    .catch(err=>{
      Swal.fire('Error',err.error.msg,'error');
    });
  }

  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(
        resp=>{
          const {nombre,email} = this.perfilForm.value; 
          this.usuario.nombre=nombre;
          this.usuario.email=email;
          Swal.fire('Guardado','Cambios fueron guardados','success');
        },
        (err)=>{
          console.log(err);
          Swal.fire('Error',err.error.msg,'error');
        }
      );
  }

}
