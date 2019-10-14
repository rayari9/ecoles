import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Classe} from "../models/classes";
import {Enseignant} from "../models/enseignants";
import {Decoupage} from "../models/decoupage";

import {ReponseUrl} from "../models/reponse-url";
import {AuthService} from "./auth.service";
import {EnseignantsComponent} from "../home/enseignants/enseignants.component";

@Injectable()
export class ClasseService {

  constructor(private http: HttpClient, private authService: AuthService) { }
////////*******Classes******/////
  getClasses(): Observable<Classe[]> {

    console.log("classes services")
    return this.http.get<Classe[]>(this.authService.getSubDomain()+"/classes/"+this.authService.getNomGroupe());
  }
  getClassesParEcole(): Observable<Classe[]> {

    console.log("classes services")
    return this.http.get<Classe[]>(this.authService.getSubDomain()+"/classesEcole/"+this.authService.getNomGroupe()+"/"+this.authService.getIdSelectedEcole());
  }
  getClassesbyidEcole(idecole): Observable<any> {
    //console.log("select ecole classes",this.authService.getIdSelectedEcole());
    return this.http.get<Classe[]>(this.authService.getSubDomain()+"/classes/"+idecole+"/"+this.authService.getNomGroupe());
  }
  getEnseignants(): Observable<Enseignant[]> {

    console.log("enseignants services")
    return this.http.get<Enseignant[]>(this.authService.getSubDomain()+"/enseignants/"+this.authService.getNomGroupe());
  }


  getDecoupages(): Observable<Decoupage[]> {

    console.log("decoupages services")
    return this.http.get<Decoupage[]>(this.authService.getSubDomain()+"/decoupages/"+this.authService.getNomGroupe());
  }


  //Ajouter une classe
  AddClasse(classe : Classe)
  {
    console.log(classe.nomC);
    console.log(classe);
    this.http.post(this.authService.getSubDomain()+'/classes', {classe: classe , nomGroupe: this.authService.getNomGroupe()})
      .subscribe((resp: any) => {
        console.log(resp);
      }, (errorResp) => {
      });
  }

  //supprimer une classe
  deleteClasse(id): Observable<ReponseUrl> {
    return this.http.get<ReponseUrl>(this.authService.getSubDomain()+"/classes/"+id+"/"+this.authService.getNomGroupe());
  }


  //modifier une classe
  updateClasse(classe){

    console.log(classe);

    this.http.put(this.authService.getSubDomain()+"/classes",
      {
        idClasse: classe.id,
        nomGroupe : this.authService.getNomGroupe(),
        nomC : classe.nomC,
        abrege: classe.abrege,
        idDecoupage: classe.idDecoupage ,
        formatNotation: classe.formatNotation
      }
    ).subscribe((resp: any) => {
      console.log(resp);
    }, (errorResp) => {
      console.log(errorResp);
    });

  }

  getClassesExcel(nomGroupe){
    return this.http.get<Classe[]>(this.authService.getSubDomain()+"/classes_Excel/"+nomGroupe);
  }
}



