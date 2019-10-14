import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {PeriodeComponent} from "./periode.component";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Globals} from "../../../models/globals";

@Component({
  selector: 'app-personnalise',
  templateUrl: './personnalise.component.html',
})


export class PersonnaliseComponent implements OnInit {

  _ref:any;
  value: string = '';
  libelleD : any='';
  public invoiceForm: FormGroup;

total:any='';
  @ViewChild('form')
  private form: FormGroup;
  @ViewChild('addPeriode', { read: ViewContainerRef }) container: ViewContainerRef;


  constructor(private _cfr: ComponentFactoryResolver,private globals: Globals,private _fb: FormBuilder){}
  ngOnInit()
  {
    this.value=localStorage.getItem("whatever");
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()])
    });


  }

  remove()
  {
    this._ref.destroy();
  }

  initItemRows() {
    return this._fb.group({
      periode: [''],
      datedebut: [''],
      datefin: [''],
    });
  }
  saveLibelleD(){
    this.globals.inputD=this.libelleD;
  }
  ajouterPeriode() {
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    control.push(this.initItemRows());
  }

  deleteRow(index: number) {
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    control.removeAt(index);
  }


}
