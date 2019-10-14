import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { Parent} from "../models/parent";
import {ReponseUrl} from '../models/reponse-url';
import {AuthService} from "./auth.service";



@Injectable()
export class ParentService {


  constructor(private http: HttpClient, private authService:AuthService) {

    console.log('Reset Service Initialized...');
  }


  getParent(): Observable<Parent[]> {
    console.log("parents");
    return this.http.get<Parent[]>(this.authService.getSubDomain()+"/parents/"+ this.authService.getNomGroupe());
  }


  getListParentsEcole(): Observable<any> {
    //console.log("select ecole",this.authService.getIdSelectedEcole());

    return this.http.get<Parent[]>(this.authService.getSubDomain()+"/parentsEcole/"+this.authService.getNomGroupe()+"/"+this.authService.getIdSelectedEcole());
  }

  getParentEleve(id): Observable<Parent[]> {
    console.log("id==="+id)
    return this.http.get<Parent[]>(this.authService.getSubDomain()+"/eleveparents/"+id+"/"+ this.authService.getNomGroupe());
  }

  deleteParent(id): Observable<ReponseUrl> {
   // console.log("id==="+id);
    return this.http.get<ReponseUrl>( this.authService.getSubDomain() +"/parents/"+id+"/"+this.authService.getNomGroupe());
  }

  AddParent(parent : Parent) {
    this.http.post(this.authService.getSubDomain()+'/parents', {parent: parent, nomGroupe:this.authService.getNomGroupe() } )
      .subscribe((resp: any) => {
       console.log(resp);
      }, (errorResp) => {
      });
  }

  updateParent(parent){

    this.http.put(this.authService.getSubDomain()+"/parents/" ,
      {
        nomGroupe : this.authService.getNomGroupe(),
        id:parent.id,
        nomP : parent.nomP,
        prenomP : parent.prenomP,
        tel1 : parent.tel1,
        tel2 : parent.tel2,
        emailP : parent.emailP,
        adressePostaleP : parent.adressePostaleP,
        lienPrente :  parent.lienPrente,
        prof :  parent.prof,
        avatar :  parent.avatar,
        login :  parent.login,
        password :  parent.password,
      }).subscribe((resp: any) => {
      console.log(resp);
    }, (errorResp) => {
      console.log(errorResp);
    });
  }



  getParentsExcel(nomGroupe){
    return this.http.get<Parent[]>(this.authService.getSubDomain()+"/parents_Excel/"+nomGroupe);
  }
}
