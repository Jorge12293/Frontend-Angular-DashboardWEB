import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit,OnDestroy {
  
  public cargando:boolean =true;
  public medicos:Medico[]=[];
  private imgSubs?: Subscription; 
  
  constructor(
    private modalImagenService: ModalImagenService,
    private medicosService:MedicoService,
    private busquedaService:BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImage
        .pipe(delay(600))
        .subscribe(img=>this.cargarMedicos());
  }
  
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  cargarMedicos(){
    this.cargando= true;
    this.medicosService.cargarMedicos()
        .subscribe(
          medicos=>{
            console.log(medicos);
            this.medicos=medicos;
            this.cargando=false;
          },
          error=>{
            this.cargando=false;
            console.log(error)
          }
        );
  }



  
  abrirModal(medico:Medico){
    this.modalImagenService.abrirModal('medicos',medico._id ?? '',medico.img)
  }

  buscar(termino:string){
    if(termino.length === 0 ){
      return this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos',termino)
        .subscribe(
          resp=>{
            this.medicos=resp;
          }
        );
  }

  borrarMedico(medico:Medico){
    Swal.fire({
      title:'¿Borrar Medico?',
      text:`Esta a punto de borrar a ${medico.nombre}`,
      icon:'question',
      showCancelButton:true,
      confirmButtonText:'Si, Borrarlo'
    }).then((result)=>{
      if(result.value){
        this.medicosService.borrarMedico(medico._id ?? '')    
            .subscribe(
              resp=>{
                this.cargarMedicos();
                Swal.fire(
                  'Medico Borrado',
                  `${medico.nombre} fue eliminado corrrectamente`,
                  'success'
                );
              }
            );
      }
    });
  }
}
