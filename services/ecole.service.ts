import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Ecoles} from "../models/ecoles";
import {ReponseUrl} from "../models/reponse-url";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {HoraireEcoles} from "../models/horaire-ecoles";
import { DonneeServeurs} from "../models/donneeServeurs";
import {GroupeScolaires} from "../models/groupe-scolaires";

@Injectable()
export class EcoleService {
  private nomDomaine: any;
  private nomSubDomain: any;

  constructor(private http: HttpClient, private authServ : AuthService) {
    this.nomDomaine = document.location.hostname;
    this.nomSubDomain = this.nomDomaine.split(".");
  }
////////*******Ecoles******/////

  /* getEcoles(): Observable<Ecoles[]> {
   return this.http.get<Ecoles[]>("http://"+this.nomSubDomain[0]+'.'+this.nomSubDomain[1]+":3000/api/ecoles");
   //return this.http.get<Ecoles[]>("http://"+this.nomSubDomain[0]+'.'+this.nomSubDomain[1]+'.'+this.nomSubDomain[2]+"/api/ecoles");
   }*/


  getEcoles(nomGroupe){
    return this.http.get<Ecoles[]>(this.authServ.getSubDomain()+"/ecoles_Groupe_Scolaire_Order/"+nomGroupe);
  }


  getEcolesExcel(nomGroupe){
    return this.http.get<Ecoles[]>(this.authServ.getSubDomain()+"/ecoles_Excel/"+nomGroupe);
  }





  AddEcole(ecole : Ecoles) {
    this.http.post(this.authServ.getSubDomain()+"/ecoles",{ecole: ecole, nomGroupe:this.authServ.getNomGroupe()} )
      .subscribe((resp: any) => {
        console.log(resp);
      }, (errorResp) => {
      });
  }





  DeleteEcole(id): Observable<ReponseUrl> {
    console.log("id==="+id);
    return this.http.get<ReponseUrl>(this.authServ.getSubDomain()+"/ecoles/"+this.authServ.getNomGroupe()+"/"+id);
  }



  editEcole(ecole){
    console.log("ecooooooleId"+ecole.id);
    this.http.put(this.authServ.getSubDomain()+"/ecoles/",{ecole: ecole, nomGroupe:this.authServ.getNomGroupe()} )
      .subscribe((resp: any) => {
        console.log(resp);
      }, (errorResp) => {
      });
  }






}
