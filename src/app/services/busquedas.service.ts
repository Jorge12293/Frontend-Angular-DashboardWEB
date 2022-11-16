import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, delay, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
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

   buscar(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino:string,
    ){
    
    const url =`${base_url}/todo/coleccion/${tipo}/${termino}`;
    console.log(url);
    return this.http.get<any[]>(url,this.headers)
      .pipe(
        map((resp:any)=>{
          switch (tipo){
            case "usuarios":
              return this.transformarUsuario(resp.resultado)
            default:
              return [];
          }
        })
      );
  }

}