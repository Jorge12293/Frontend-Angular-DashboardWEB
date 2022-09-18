import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errorfound',
  templateUrl: './errorfound.component.html',
  styleUrls: ['./errorfound.component.css']
})
export class ErrorfoundComponent implements OnInit {
  year = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
