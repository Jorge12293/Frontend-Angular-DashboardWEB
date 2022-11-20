import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunction():void;

@Component({
  selector: 'app-pages',
  templateUrl: 'pages.component.html',
})
export class PagesComponent implements OnInit {


  constructor( 
    private settingServices:SettingsService,
    public sidebarService:SidebarService) { }

  ngOnInit(): void {
    customInitFunction();
    this.sidebarService.cargarMenu();
  }

}
