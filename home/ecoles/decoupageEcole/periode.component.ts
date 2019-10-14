import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Globals} from "../../../models/globals";


@Component({
  selector: 'app-periode',
  templateUrl: './periode.component.html',

})
export class PeriodeComponent implements OnInit {


  _ref:any;
  value: string = '';
  idMatiere : any='';
  periode : any='';
  datedebut : any='';
  datefin : any='';
  total : any='';



  constructor(private globals: Globals ) {}
  ngOnInit()
  {
    this.value=localStorage.getItem("whatever");
  }

  remove()
  {
    this._ref.destroy();
  }




}
