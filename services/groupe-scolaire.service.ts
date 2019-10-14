import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {GroupeScolaires} from "../models/groupe-scolaires";
import {environment} from "../../environments/environment";
import {Ecoles} from "../models/ecoles";
import {AuthService} from "./auth.service";


@Injectable()
export class GroupeScolaireService {

  private nomDomaine: any;
  private nomSubDomain: any;

////////////////////////////constructeur///////////////////////////////////////////
  constructor(private http: HttpClient, private authService: AuthService) {
    this.nomDomaine = document.location.hostname;
    this.nomSubDomain = this.nomDomaine.split(".");
  }

/////////////////////////////////affichage liste des groupes //////////////////////////////////////////
  getGroupeScolaires(): Observable<GroupeScolaires[]> {

    return this.http.get<GroupeScolaires[]>(this.authService.getSubDomain() + "/groupeScolaires");
  }


///////////////////////////////////////ajout///////////////////////////////////////////////////////////////
  AddGroupeScolaire(groupe) {

    this.http.post(this.authService.getSubDomain() + "/groupeScolaires", groupe)

      .subscribe((resp: any) => {
        console.log("groupe add service",resp);
      }, (errorResp) => {

      });
  }

///////////////////////////modification//////////////////////////////////////////////////////////////////////////

  editGroupeScolaire(groupe) {


    this.http.put(this.authService.getSubDomain() + "/groupeScolaires/" + groupe.id + "/" + groupe.nombase,
      {
        id: groupe.id,
        nomG: groupe.nomG,
        domaine: groupe.domaine,
        imagePageConx: groupe.imagePageConx,
        logoPageConx: groupe.logoPageConx,
        couleurExterne: groupe.couleurExterne,
        logoBarreTache: groupe.logoBarreTache,
        couleurBarreTache: groupe.couleurBarreTache

      }
    ).subscribe((resp: any) => {
      console.log(resp);
    }, (errorResp) => {
      console.log(errorResp);
    });

  }

////////////////////////////////////suppression///////////////////////////////////////////////////////////

  deleteGroupeScolaire(idGroupe, nomBase) {

    this.http.put(this.authService.getSubDomain() + "/groupeScolaires/delete/" + idGroupe + "/" + nomBase, {}).subscribe((resp: any) => {
      console.log(resp);
    }, (errorResp) => {
      console.log(errorResp);
    });
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getEcoles(nomGroupe) {
    return this.http.get<Ecoles[]>(this.authService.getSubDomain() + "/ecoles_Groupe_Scolaire/" + nomGroupe);
  }


  getGroupeScolaire_precise(nomGroupe): Observable<GroupeScolaires[]> {

    var test = this.http.get<GroupeScolaires[]>(this.authService.getSubDomain() + "/groupe_scolaire_precise/" + nomGroupe);

    //console.log(test);
    // console.log(typeof test );
    return test;


  }

  /***********export excel*///////////////////////////////////////////////////////
  getGroupesExcel() {

    return this.http.get<GroupeScolaires[]>(this.authService.getSubDomain() + "/groupes_Excel");
  }
}

