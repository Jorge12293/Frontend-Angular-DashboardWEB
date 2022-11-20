import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, delay, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';


const base_url= environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {
  public usuario!: Usuario;
  constructor(
    private http:HttpClient,
  ) { }

  get token():string{
    return localStorage.getItem('token') || '';
   }

   get headers(){
    return {
        headers:{
          'x-token':this.token
        }
      }
   }

  private transformarUsuario(resultados:any[]): Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid)
    );
  }

  private transformarHospitales(resultados:any[]): Hospital[]{
    return resultados;
  }
  
  private transformarMedicos(resultados:any[]): Medico[]{
    return resultados;
  }

  busqueGlobal(termino:string){
    const url =`${base_url}/todo/${termino}`;
    return this.http.get<any[]>(url,this.headers);
  } 


   buscar(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino:string,
    ){
    
    const url =`${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url,this.headers)
      .pipe(
        map((resp:any)=>{
          switch (tipo){
            case "usuarios":
              return this.transformarUsuario(resp.resultado)
            case "hospitales":
              return this.transformarHospitales(resp.resultado)  
            case "medicos":
                return this.transformarMedicos(resp.resultado)    
            default:
              return [];
          }
        })
      );
  }
}
