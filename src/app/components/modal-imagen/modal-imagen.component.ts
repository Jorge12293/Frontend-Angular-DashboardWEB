import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!:File;
  public imgTemp!:any;

  constructor(
    public fileUploadServices:FileUploadService,
    public modalImagenService:ModalImagenService
  ) { }

  ngOnInit(): void {}
  
  cerrarModal():void{
    this.imgTemp=null;
    this.modalImagenService.cerrarModal();
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
    
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadServices.actualizarFoto(this.imagenSubir,tipo,id)
    .then(img=>{
      Swal.fire('Guardado','Actualizada Imagen','success');
      this.modalImagenService.nuevaImage.emit(img);
      this.cerrarModal();
    })
    .catch(err=>{
      Swal.fire('Error',err.error.msg,'error');
    });
  }


  pulsar(){
    Swal.fire(
      'Deleted',
      'Uusaurio Eliminado.',
      'success'
    );
  }
  

}
