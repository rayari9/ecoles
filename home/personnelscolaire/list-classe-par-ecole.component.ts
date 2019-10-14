import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,Type} from '@angular/core';
import {EleveService} from "../../services/eleve.service";
import {EcoleService} from "../../services/ecole.service";
import {ClasseService} from "../../services/classe.service";
import {MatiereService} from "../../services/matiere.service";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


import 'jspdf-autotable';
import {HttpClient} from "@angular/common/http";
import {CompteProService} from "../../services/comptePro.service";
import {Personnels} from "../../models/Personnels";
import 'jspdf-autotable';

@Component({
  selector: 'app-list-classe-par-ecole',
  templateUrl: './list-classe-par-ecole.component.html',
  styleUrls: ['./list-classe-par-ecole.component.css']
})
export class ListClasseParEcoleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
