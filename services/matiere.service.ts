import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Matiere} from "../models/matieres";
import {ReponseUrl} from "../models/reponse-url";
import {AuthService} from "./auth.service";

@Injectable()
export class MatiereService {

  constructor(private http: HttpClient, private authSevice : AuthService) { }


  // afficher liste des matieres optionnelles
  getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.authSevice.getSubDomain()+"/matiereopts/"+this.authSevice.getNomGroupe());
  }


// afficher tous les matières
  getAllMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.authSevice.getSubDomain()+"/matieres/"+this.authSevice.getNomGroupe());
  }

 //Ajouter une matière
  AddMatiere(matiere :Matiere)
  {
    console.log("matieres services ", matiere);
    console.log(matiere.nomMatiere);
    return this.http.post(this.authSevice.getSubDomain()+'/matieres', {matiere: matiere , nomGroupe: this.authSevice.getNomGroupe()})
      .subscribe((resp: any) => {
        console.log(resp);
      }, (errorResp) => {
      });


  }




  //supprimer matière
  deleteMatiere(id): Observable<ReponseUrl> {
    return this.http.get<ReponseUrl>(this.authSevice.getSubDomain()+"/matieres/"+id+"/"+this.authSevice.getNomGroupe());
  }

  //modifier matiére
  updateMatiere(matiere :Matiere){

    this.http.put(this.authSevice.getSubDomain()+"/matieres/",
      {
        id:matiere.id,
        nomGroupe : this.authSevice.getNomGroupe(),
        //idE:matiere.idE,
      nomMatiere : matiere.nomMatiere,
      abrege: matiere.abrege,
      estOptionnelle: matiere.estOptionnelle,
      icone: matiere.icone
    }
    ).subscribe((resp: any) => {
       // console.log(resp);
      }, (errorResp) => {
      //console.log(errorResp);
      });

  }


  getMatieresEcole(): Observable<any> {
    console.log("select ecole",this.authSevice.getIdSelectedEcole());

    return this.http.get<Matiere[]>(this.authSevice.getSubDomain()+"/matieresEcole/"+this.authSevice.getNomGroupe()+"/"+this.authSevice.getIdSelectedEcole())



;
  }



  getMatieresExcel(nomGroupe){
    return this.http.get<Matiere[]>(this.authSevice.getSubDomain()+"/matieres_Excel/"+nomGroupe);


  }
}
