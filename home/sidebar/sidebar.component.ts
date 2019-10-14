import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const $ = window["$"];
    $(document).ready(function(){
      $("#btnMenu").click(function(){
        $("#menu").toggle();
      });
    });
  }

  color_externe:string = '#cccccc';
  color_barre_tache:string = '#dddddd';
}
