import { Component } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-grafica-one',
  templateUrl: './grafica-one.component.html',
  styleUrls: ['./grafica-one.component.css']
})
export class GraficaOneComponent {

  donaCharType: ChartType = 'doughnut';
  labels_dona: string[] = [ 'Ventas', 'Stock', 'Cantidad' ];
  dataCant: number[] =[ 90, 5, 5 ];

  data_dona: ChartData<'doughnut'> = {
    labels: this.labels_dona,
    datasets: [
      { 
        data:this.dataCant,
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
        hoverBackgroundColor: ['#6857E6','#009FEE','#F02059'],
        hoverBorderColor:['#000000','#000000','#00000003'] 
      }
    ]
  };

  labels_dona2: string[] = [ 'Futbol', 'Soccer', 'Indor' ];
  dataCant2: number[] =[ 40, 30, 30 ];
  data_dona2: ChartData<'doughnut'> = {
    labels: this.labels_dona2,
    datasets: [
      { 
        data:this.dataCant2,
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
        hoverBackgroundColor: ['#6857E6','#009FEE','#F02059'],
        hoverBorderColor:['#000000','#000000','#00000003'] 
      }
    ]
  };


}