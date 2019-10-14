import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,Type} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CompteProService} from "../../services/comptePro.service";
import {HttpClient} from "@angular/common/http";
import {Enseignant} from "../../models/enseignants";

@Component({
  selector: 'app-list-enseignant',
  templateUrl: './list-enseignant.component.html',
  styleUrls: ['./list-enseignant.component.css']
})
export class ListEnseignantComponent implements OnInit {

  constructor(private http: HttpClient,private enseignantService: CompteProService) { }

  ngOnInit() {
  }

}
