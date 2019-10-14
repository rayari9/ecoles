import { Component, OnInit,ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef } from '@angular/core';


import { ExpComponent } from '../exp/exp.component'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;
  constructor(private _cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    this.addComponent();
  }

  addComponent(){

    var comp = this._cfr.resolveComponentFactory(ExpComponent);
    var expComponent = this.container.createComponent(comp);
    expComponent.instance._ref = expComponent;
  }

}


