import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  
  public hospitales:Hospital[]=[];
  public cargando:boolean=true;
  private imgSubs?:Subscription;

  constructor(
    private modalImagenService:ModalImagenService,
    private hospitalService:HospitalService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs= this.modalImagenService.nuevaImage
      .pipe(delay(600))
      .subscribe(img=>this.cargarHospitales());
  }


  guardarCambios(hospital:Hospital){
    this.hospitalService.actualizarHospital(hospital._id ?? '',hospital.nombre)
      .subscribe(
        resp=>{
          console.log(resp);
          this.cargarHospitales();
          Swal.fire('Actualizado',hospital.nombre,'success');
        }
      );
  }

  eliminarHospital(hospital:Hospital){
    this.hospitalService.borrarHospital(hospital._id ?? '')
      .subscribe(
        resp=>{
          console.log(resp);
          this.cargarHospitales();
          Swal.fire('Borrado',hospital.nombre,'success');
        }
      );
  }

  cargarHospitales(){
    this.cargando=true;
    this.hospitalService.cargarHospitales()
      .subscribe(
        resp=>{
          this.cargando=false;
          this.hospitales=resp;
        }
      );
  }

  async abrirSweetAlert(){
    const {value} =await Swal.fire<string>({
      title:'Crear hospital',
      text:'Ingres el nombre del nuevo hospital',
      input:'text',
      inputPlaceholder:'Nombre de Hospital',
      showCancelButton:true
    });
    
    let valorString: string = value  ?? '';
    if(valorString.trim().toString().length > 0 ){
      this.hospitalService.crearHospital(valorString)
        .subscribe(
          (resp:any)=>{
            this.hospitales.push(resp.hospital)
          }
        );
    }
  
  }

  abrirModal(hospital:Hospital){
    this.modalImagenService.abrirModal('hospitales',hospital._id ?? '',hospital.img)
  }

}
