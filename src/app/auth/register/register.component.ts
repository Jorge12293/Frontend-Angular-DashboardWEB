import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
 

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  public registerForm = this.fb.group({
    nombre:['Jorge',[Validators.required,Validators.minLength(3)]],
    email:['jorge@gmail.com',[Validators.required]],
    password:['123456789',[Validators.required]],
    password2:['123456789',[Validators.required]],
    terminos:[true,[Validators.required]],
  });

  crearUsuario(){
    console.log(this.registerForm.value)
  }
}
