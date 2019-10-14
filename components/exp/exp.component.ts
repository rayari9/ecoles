import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.css']
})
export class ExpComponent implements OnInit {
  _ref:any;
  lang: string;
  exp: number;
  constructor() { }

  ngOnInit() {
  }

  removeObject(){
    this._ref.destroy();
  }

  save(){
    if(this.lang && this.exp)
      alert(`Language: ${this.lang} & Experience: ${this.exp}`);
    else
      alert('Please enter value to save');
  }

}


