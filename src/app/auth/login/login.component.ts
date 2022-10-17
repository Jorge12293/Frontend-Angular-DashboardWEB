import { Component, OnInit,AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  constructor(
    private router:Router,
    private fb:FormBuilder,
    private ngZone:NgZone,
    private usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "775645818052-blgmp1pk3lrtakicqf455si8hj91stf1.apps.googleusercontent.com",
      callback: (response:any)=>this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  
    );
  }

  handleCredentialResponse(response:any){
    this.usuarioService.loginGoogle(response.credential)
    .subscribe(resp=>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/');
      });
    });
  }

  public loginForm:FormGroup = this.fb.group({
    email:[localStorage.getItem('email') || '',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    remember:[false]
  });





  login(){
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp=>{
        if(this.loginForm.get('remember')?.value){
          localStorage.setItem('email',this.loginForm.get('email')?.value)
        }else{
          localStorage.removeItem('email');
        }
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/');
        });
      },(err)=>{
        Swal.fire('Error',err.error.msg,'error');
      });
    
  }

}