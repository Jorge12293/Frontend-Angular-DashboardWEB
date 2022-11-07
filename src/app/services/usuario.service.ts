import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { Usuario } from '../models/usuario.model';

declare const google:any;
const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor(
    private http:HttpClient,
    private router:Router,
    private ngZone:NgZone
    ) { 

     this.googleInit();
  }

   get token():string{
    return localStorage.getItem('token') || '';
   }

   get uid():string{
    return this.usuario.uid || '';
   }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "775645818052-blgmp1pk3lrtakicqf455si8hj91stf1.apps.googleusercontent.com",
      callback: (response:any)=>console.log(response)
    });
  }


  logout(){
    try {
      localStorage.removeItem('token');
      google.accounts.id.revoke('jorgedesarrollo717@gmail.com',()=>{
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/login');
        });
      }); 
    
    } catch (error) {
      console.log(error);
      this.router.navigateByUrl('/login');
    }
  }
  

  validarToken():Observable<boolean>{
  //  const token=localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    })
    .pipe(
      map((resp:any)=>{
        const {email,google,nombre,role,img='',uid} = resp.usuario;
        this.usuario=new Usuario(nombre,email,'',img,google,role,uid);
        localStorage.setItem('token',resp.token);
        return true;
      }),
      map(resp=>true),
      catchError(error=> of(false))
    );

  }

  crearUsuario(formData:RegisterForm){
    console.log('Creando Usuario');
    return this.http.post(`${base_url}/usuarios`,formData)
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
      })
    );
  }

  actualizarPerfil(data:{email:string,nombre:string,role:string}){
    data={
      ...data,
      role : this.usuario.role || ''
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
      headers:{
        'x-token':this.token
      }
    });
  }

  login(formData :LoginForm){
    console.log('Login Usuario');
    return this.http.post(`${base_url}/login`,formData)
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
      })
    );
  }
  
  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token})
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
      })
    );
  }

}
