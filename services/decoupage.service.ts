import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Decoupage} from "../models/decoupage";

import {ReponseUrl} from "../models/reponse-url";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {HoraireEcoles} from "../models/horaire-ecoles";

@Injectable()
export class DecoupageService {
  private nomDomaine: any;
  private nomSubDomain: any;

  constructor(private http: HttpClient, private authServ : AuthService) {
    this.nomDomaine = document.location.hostname;
    this.nomSubDomain = this.nomDomaine.split(".");
  }



  getDecoupages(nomGroupe){

    return this.http.get<Decoupage[]>(this.authServ.getSubDomain()+"/decoupages/"+nomGroupe);
  }









}
