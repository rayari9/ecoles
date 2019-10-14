import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bimestre',
  templateUrl: './bimestre.component.html',
})
export class BimestreComponent implements OnInit {

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
