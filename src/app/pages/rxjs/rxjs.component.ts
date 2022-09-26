import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, retry,interval, Subscription } from 'rxjs';
import { take,map,filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit,OnDestroy {

  public intervaSub!:Subscription;
  constructor() {
    
    this.intervaSub=this.retornaIntervalo()
      .subscribe(console.log);

    /*
    this.retornaObservable().pipe(
      retry(1)
    ).subscribe(
      valor=> console.log('Sub: ',valor),
      error=> console.warn('Error: ',error),
      ()=> console.info('Obs terminado')
    );
    */
  }
  ngOnDestroy(): void {
    this.intervaSub.unsubscribe();
  }


  retornaIntervalo():Observable<number> {
    return interval(500)
      .pipe(
        map(valor=>{
          return valor+1;
        }),
        filter(valor=> (valor % 2 ===0) ? true:false),
        take(10),
      );
  }

  retornaObservable():Observable<number>{
    let i= -1;

    return new Observable<number>(observer=>{
  
      const intervalo= setInterval(()=>{
        i++;
        observer.next(i);

        if(i===4){
          clearInterval(intervalo);
          observer.complete();
        }

        if(i===2){
          console.log('i llego al valor de 2');
          //i=0;
          observer.error('i llego al valor de 2');
        }

      },100)
    })
    
  }

  ngOnInit(): void {
  }

}
