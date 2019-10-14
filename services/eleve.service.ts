import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { Eleve} from "../models/eleve";
import { Matiere} from "../models/matieres";
import {ReponseUrl} from '../models/reponse-url';
import {AuthService} from "./auth.service";



@Injectable()
export class EleveService {


  constructor(private http: HttpClient,private authService: AuthService
  ) {

    console.log('Reset Service Initialized...');
  }

  getEleves(): Observable<Eleve[]> {

    console.log("eleves" , this.authService.getNomGroupe());

    return this.http.get<Eleve[]>(this.authService.getSubDomain()+"/eleves/"+ this.authService.getNomGroupe());
  }

  getElevesEcoles(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.authService.getSubDomain()+"/ecoleEleve/"+ this.authService.getNomGroupe());
  }

  deleteEleve(id): Observable<ReponseUrl> {
    console.log("Service id ==="+id);
    return this.http.get<ReponseUrl>(this.authService.getSubDomain()+"/eleves/"+id+"/"+ this.authService.getNomGroupe());
  }

  AddEleve(eleve : Eleve) {
    this.http.post(this.authService.getSubDomain()+'/eleves', {eleve:eleve, nomGroupe: this.authService.getNomGroupe() } )
      .subscribe((resp: any) => {

        console.log(resp);

      }, (errorResp) => {


      });
  }

  getListElevesEcole(): Observable<any> {
    //console.log("select ecole",this.authService.getIdSelectedEcole());

    return this.http.get<Eleve[]>(this.authService.getSubDomain()+"/elevesEcole/"+this.authService.getNomGroupe()+"/"+this.authService.getIdSelectedEcole());
  }

  /*
   AddMatiereOptionnelle(matiere : Matiere) {
   this.http.post('http://localhost:3000/api/matiereopts', matiere )
   .subscribe((resp: any) => {

   console.log(resp);

   }, (errorResp) => {


   });
   }
   */


  getElevesExcel(nomGroupe){
    return this.http.get<Eleve[]>(this.authService.getSubDomain()+"/eleves_Excel/"+nomGroupe);
  }


  getParentEleve(id): Observable<Eleve[]> {
    console.log("id==="+id)
    return this.http.get<Eleve[]>(this.authService.getSubDomain()+"/parentseleves/"+id+"/"+ this.authService.getNomGroupe());
  }
  getMatiereEleve(id): Observable<Eleve[]> {
    console.log("id==="+id)
    return this.http.get<Eleve[]>(this.authService.getSubDomain()+"/matiereseleves/"+id+"/"+ this.authService.getNomGroupe());
  }


  updateEleve(eleve){

    console.log("service update " ,eleve.id);

    this.http.put(this.authService.getSubDomain()+"/eleves/" ,
      {
        nomGroupe : this.authService.getNomGroupe(),
        id:eleve.id,
        nom : eleve.nom,
        prenom : eleve.prenom,
        adressePostale : eleve.adressePostale,
        nomE : eleve.nomE,
        abrege : eleve.abrege,
        dateN : eleve.dateN,
        dateSortie : eleve.dateSortie,
        dateEntree : eleve.dateEntree,
        provenance : eleve.provenance,
        motifSortie : eleve.motifSortie,
        redoublant : eleve.redoublant,
        avatar :  eleve.avatar,
        login :  eleve.login,
        password :  eleve.password,
      }).subscribe((resp: any) => {
      console.log(resp);
    }, (errorResp) => {
      console.log(errorResp);
    });
  }
}
