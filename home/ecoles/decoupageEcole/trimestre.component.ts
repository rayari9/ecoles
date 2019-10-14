import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trimestre',
  templateUrl: './trimestre.component.html',

})
export class TrimestreComponent implements OnInit {


  _ref:any;
  value: string = '';
  idMatiere : any='';

  constructor( ) {}
  ngOnInit()
  {
    this.value=localStorage.getItem("whatever");
  }

  remove()
  {
    this._ref.destroy();
  }

}
