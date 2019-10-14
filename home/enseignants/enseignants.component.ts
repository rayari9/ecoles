import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, NgModule} from '@angular/core';
import {ListEnseignantComponent} from "./list-enseignant.component";
import {CompteProService} from "../../services/comptePro.service";
import {Enseignant} from "../../models/enseignants";
import {AuthService} from "../../services/auth.service";
import {BrowserModule} from "@angular/platform-browser";
import {EcoleService} from   "../../services/ecole.service";

@Component({
  selector: 'app-enseignants',
  templateUrl: './enseignants.component.html',
  styleUrls: ['./enseignants.component.css']
})

@NgModule({
  imports: [ BrowserModule ],
  entryComponents: [ListEnseignantComponent],
  declarations: [ EnseignantsComponent, ListEnseignantComponent],
  bootstrap: [ EnseignantsComponent]
})

export class EnseignantsComponent implements OnInit {

  components = [];
  ecoles :any={};
  selectModel:any='';
  constructor(private authService : AuthService,private _cfr: ComponentFactoryResolver,private ecoleService :EcoleService,private enseignantService: CompteProService) {

    this.ecoles = ecoleService.getEcoles(authService.getNomGroupe());

  }

  ngOnInit() {
  }
  viewListEnseignants(event){



  }
}
