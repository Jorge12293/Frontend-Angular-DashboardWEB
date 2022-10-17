import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public formSubmiteed = false; 

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private usuarioService:UsuarioService) { }

  ngOnInit(): void {}

  public registerForm = this.fb.group({
    nombre:['Jorge',[Validators.required,Validators.minLength(3)]],
    email:['jorge@gmail.com',[Validators.required,Validators.email]],
    password:['123',[Validators.required]],
    password2:['123',[Validators.required]],
    terminos:[true,[Validators.required]],
  },{
    validators:this.passwordsIguales('password','password2')
  });

  crearUsuario(){
    this.formSubmiteed=true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return;
    }
    // Posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp=>{
        this.router.navigateByUrl('/');
      },(err)=>{
        // Si sucede un error
        Swal.fire('Error',err.error.msg,'error');
      });
  }
  
  campoNoValido(campo:string):boolean{
    if(this.registerForm.get(campo)?.invalid && this.formSubmiteed){
      return true;
    }else{
      return false;
    }
  }

  passwordNoValido(){
    const pass1= this.registerForm.get('password')?.value;
    const pass2= this.registerForm.get('password2')?.value;
    if( (pass1!==pass2) && this.formSubmiteed){
      return true;
    }else{
      return false;
    }
  }
  
  aceptaTerminos():boolean{
    return !this.registerForm.get('terminos')?.value && this.formSubmiteed;
  }
  
  passwordsIguales(passName1:string,passName2:string){

    return (formGroup:FormGroup)=>{
      const pass1Control = formGroup.get(passName1);
      const pass2Control = formGroup.get(passName2);
      if(pass1Control?.value===pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsIgual:true});
      }
    }
  }


}
