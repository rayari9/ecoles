import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-semestre',
  templateUrl: './semestre.component.html',

})
export class SemestreComponent implements OnInit {

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
