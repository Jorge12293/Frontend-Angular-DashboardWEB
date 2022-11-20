import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico-update',
  templateUrl: './medico-update.component.html',
  styleUrls: ['./medico-update.component.css']
})
export class MedicoUpdateComponent implements OnInit {

  public medicoForm: FormGroup = this.fb.group({});
  public hospitales:Hospital[]=[];
  
  public medicoSeleccionado?: Medico;
  public hospitalSeleccionado?: Hospital;

  constructor(
    private fb: FormBuilder,
    private hopsitalService:HospitalService,
    private medicoService:MedicoService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
   
    this.activatedRoute.params.subscribe(({id})=>this.cargarMedico(id));
    
    this.cargarHopsitales();
    this.medicoForm = this.fb.group({  
      nombre:['', Validators.required],
      hospital:['',Validators.required]
    });

    this.medicoForm.get('hospital')?.valueChanges
        .subscribe(
          hospitalId=>{
             this.hospitalSeleccionado = this.hospitales.find(h=>h._id===hospitalId); 
          }
        );
  }


  cargarMedico(id:string){
    
    if(id==='nuevo'){
      return;
    }

    this.medicoService.getMedicoById(id)
        .pipe(delay(600))
        .subscribe(
          (medico:any)=>{
            if(medico != null){
              const {nombre, hospital: { _id} } = medico;
              this.medicoSeleccionado=medico;
              this.medicoForm.setValue({nombre,hospital:_id});
            }else{
               this.router.navigateByUrl(`/dashboard/medicos`)
            }
          }
        );
  }

  cargarHopsitales(){
    this.hopsitalService.cargarHospitales()
        .subscribe(
          (hospitales:Hospital[])=>{
            this.hospitales=hospitales;
          },
          err=>{
            console.log(err);
          }
        );
  }
  
  guardarMedico(){
    const {nombre}= this.medicoForm.value; 
    if(this.medicoSeleccionado != null){
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data).subscribe(
        resp=>{
          console.log(resp);
          Swal.fire('Actualizado',`${nombre} actulizado correctamente`,'success');
        },
        err=>{
          console.log(err);
        }
      );

    }else{
      
      this.medicoService.crearMedico(this.medicoForm.value)
         .subscribe(
           (resp:any)=>{
             console.log(resp);
             Swal.fire('Creado',`${nombre} creado correctamente`,'success');
             this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
           },
           error=>{
             console.log(error);
           }
         ); 
    }
  }

  
}
