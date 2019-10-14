import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {GroupeScolaireService} from "../../services/groupe-scolaire.service";
import {EcoleService} from "../../services/ecole.service";

@Component({
  selector: 'app-importation-excel',
  templateUrl: './importation-excel.component.html',
  styleUrls: ['./importation-excel.component.css']
})
export class ImportationExcelComponent implements OnInit {
  connectedUser:any='';
  dateDeconx: any='';
  ecoles: any='';
  groupeScolaires: any = '';
  selectModel: any = '';
  value:any=';';
  nameGroupe:any=';';
  constructor( private authServ: AuthService,private GSservice: GroupeScolaireService,private eco: EcoleService) {
    this.groupeScolaires = GSservice.getGroupeScolaires();

    console.log(this.nameGroupe);
    this.connectedUser=authServ.getConnectedUser();
    let dateValue=Date.parse( this.connectedUser['derniereCnx']);
    this.dateDeconx=new Date(dateValue).toLocaleString();
  }

fnct(event){
  this.ecoles = this.eco.getEcoles(event.target.value);
}

  ngOnInit() {
  }
}
