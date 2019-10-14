import {Component, OnInit} from '@angular/core';

@Component
({
  selector: 'app-matiere-optionnelle',
  templateUrl: './matiere-optionnelle.component.html',
})

export class MatiereOptionnnelleComponent implements OnInit {

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
