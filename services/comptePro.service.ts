/**
 * Created by S1-DEV-ETC on 20/03/2018.
 */
import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Personnels} from "../models/Personnels";
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from "@angular/common/http";
import {EcolesComponent} from "../home/ecoles/ecoles.component";
import {error, log} from "util";
import {ReponseUrl} from "../models/reponse-url";
import {environment} from "../../environments/environment";
import {Ecoles} from "../models/ecoles";
import {AuthService} from "./auth.service";
@Injectable()


export class CompteProService {
  private nomDomaine: any;
  private nomSubDomain: any;
  constructor(private http: HttpClient , private authService: AuthService) {
    this.nomDomaine = document.location.hostname;
    this.nomSubDomain =this.nomDomaine.split(".");
  }

  ajouterPersonnel(personnel:Personnels){

    this.http.post(this.authService.getSubDomain()+'/personnels',{personnel: personnel, nomGroupe:this.authService.getNomGroupe()} )
      .subscribe((resp: any) => {
        console.log(resp);
      }, (errorResp) => {
      });
  }

  updatePersonnel(personnel:Personnels){

    this.http.put(this.authService.getSubDomain()+'/personnels',{personnel: personnel, nomGroupe:this.authService.getNomGroupe()} )
      .subscribe((resp: any) => {
        console.log(resp);
      }, (errorResp) => {
      });
  }

  getListPersonnelsEcole(): Observable<any> {
    console.log("select ecole",this.authService.getIdSelectedEcole());

    return this.http.get<Personnels[]>(this.authService.getSubDomain()+"/personnels/"+this.authService.getNomGroupe()+"/"+this.authService.getIdSelectedEcole());
  }
  getListEnseignantslsEcole(): Observable<any> {
    console.log("select enseignants",this.authService.getIdSelectedEcole());

    return this.http.get<Personnels[]>(this.authService.getSubDomain()+"/enseignants/"+this.authService.getNomGroupe()+"/"+this.authService.getIdSelectedEcole());
  }


  deletePersonnel(id): Observable<ReponseUrl> {
    console.log("Service id ==="+id);
    return this.http.get<ReponseUrl>(this.authService.getSubDomain()+"/personnel/"+id+"/"+ this.authService.getNomGroupe());
  }

  /***********************************  Directeurs *****************************************/

  getListDirecteursEcole(): Observable<any> {
    console.log("select ecole",this.authService.getIdSelectedEcole());

    return this.http.get<Personnels[]>(this.authService.getSubDomain()+"/directeurs/"+this.authService.getNomGroupe()+"/"+this.authService.getIdSelectedEcole());
  }

  ajouterDirecteur(personnel:Personnels){

    console.log("personnel service" , personnel);

    this.http.post(this.authService.getSubDomain()+'/directeurs',{personnel: personnel, nomGroupe:this.authService.getNomGroupe()} )
      .subscribe((resp: any) => {
        console.log(resp);
      }, (errorResp) => {
      });
  }
  modifierDirecteur(personnel:Personnels){

    console.log("update service",personnel)

    this.http.put(this.authService.getSubDomain()+'/directeurs',{personnel: personnel, nomGroupe:this.authService.getNomGroupe()} )
      .subscribe((resp: any) => {
        console.log(resp);
      }, (errorResp) => {
      });
  }
  /***********************************  SuperAdmin *****************************************/
  getListSuperAdminEcole(): Observable<any> {
    console.log("select ecole",this.authService.getIdSelectedEcole());

    return this.http.get<Personnels[]>(this.authService.getSubDomain()+"/superadmin/"+this.authService.getNomGroupe()+"/"+this.authService.getIdSelectedEcole());
  }

  ajouterSuperAdmin(superAdmin:Personnels){

    this.http.post(this.authService.getSubDomain()+'/superadmin',{superAdmin: superAdmin, nomGroupe:this.authService.getNomGroupe()} )
      .subscribe((resp: any) => {
        console.log(resp);
      }, (errorResp) => {
      });
  }

  /*
   getPersonnelExcel(nomGroupe){
   return this.http.get<Personnels[]>(this.authService.getSubDomain()+"/personnel_Excel/"+nomGroupe);
   }*/


  /* getComptePrecise(id){
   let resultat;
   this.http.get(this.authService.getSubDomain()+"/compte_user_precise/"+this.authService.getNomGroupe()+"/"+id)
   .toPromise()
   .then(response => {
   //this.chefEtablissement = response;
   //this.imageDirecteur    =  "../../../assets/uploads/"+this.chefEtablissement.avatar
   resultat = response;
   })
   .catch(console.log);

   return resultat;
   }
   //liste Personnels scolaire
   listPersonnelsScolaire(): Observable<Personnels[]> {
   return this.http.get<Personnels[]>(this.authService.getSubDomain() + "/personnels/" + this.authService.getNomGroupe());
   }

   //ajouter un personnel scolaire
   AddPersonnelScolaire(user : Personnels): boolean  {
   this.http.post(this.authService.getSubDomain()+"/personnels",{
   newPersonnel:user,
   nomGroupe:this.authService.getNomGroupe()
   }).subscribe((resp: any)=> {
   console.log(resp);

   }, (errorResp)=>{
   console.log('error add personnel');
   });
   return true;
   }

   //modifier un personnel scolaire
   ModifierPersonnelScolaire(user : Personnels): boolean  {

   this.http.put(this.authService.getSubDomain()+"/personnels",{
   Personnel:user,
   nomGroupe:this.authService.getNomGroupe()

   }).subscribe((resp: any)=> {
   console.log(resp);

   }, (errorResp)=>{
   console.log('error modify personnel');
   });
   return true;
   }



   list(): Observable<Personnels[]> {
   return this.http.get<Personnels[]>(this.authService.getSubDomain()+"/compte/"+this.authService.getNomGroupe());
   }



   listEnsei(): Observable<Personnels[]> {
   return this.http.get<Personnels[]>(this.authService.getSubDomain()+"/compte2/"+this.authService.getNomGroupe());
   }

   listadmin(): Observable<Personnels[]> {
   return this.http.get<Personnels[]>(this.authService.getSubDomain()+"/compte3/"+this.authService.getNomGroupe());
   }


   ecole(): Observable<Ecoles[]> {
   return this.http.get<Ecoles[]>(this.authService.getSubDomain()+"/comptee/"+this.authService.getNomGroupe());
   }



   AddPersonnels2(per:Personnels)  {
   this.http.post(this.authService.getSubDomain()+"/compte2",{per:per, nomGroupe:this.authService.getNomGroupe()})
   .subscribe((resp: any)=> {
   console.log(resp);
   }, (errorResp)=>{
   });
   }

   AddPersonnels3(per:Personnels)  {
   this.http.post(this.authService.getSubDomain()+"/compte3",{per:per, nomGroupe:this.authService.getNomGroupe()})
   .subscribe((resp: any)=> {
   console.log(resp);
   }, (errorResp)=>{
   });
   }

   // >> Method pour supprimer un personnel scolaire
   deletePersonnels(id): Observable<ReponseUrl> {
   console.log("id==="+id);
   return this.http.get<ReponseUrl>(this.authService.getSubDomain()+"/compte/"+id+"/"+this.authService.getNomGroupe());
   }
   deletePersonnels1(id): Observable<ReponseUrl> {
   console.log("id==="+id);
   //serveur return this.http.get<ReponseUrl>("http://"+this.nomSubDomain[0]+'.'+this.nomSubDomain[1]+'.'+this.nomSubDomain[2]+"/api/compte/"+id);
   return this.http.get<ReponseUrl>(this.authService.getSubDomain()+"/compte1/"+id+"/"+this.authService.getNomGroupe());
   }
   deletePersonnels2(id): Observable<ReponseUrl> {
   console.log("id==="+id);
   //serveur return this.http.get<ReponseUrl>("http://"+this.nomSubDomain[0]+'.'+this.nomSubDomain[1]+'.'+this.nomSubDomain[2]+"/api/compte/"+id);
   return this.http.get<ReponseUrl>(this.authService.getSubDomain()+"/compte2/"+id+"/"+this.authService.getNomGroupe());
   }
   deletePersonnels3(id): Observable<ReponseUrl> {
   console.log("id==="+id);
   //serveur return this.http.get<ReponseUrl>("http://"+this.nomSubDomain[0]+'.'+this.nomSubDomain[1]+'.'+this.nomSubDomain[2]+"/api/compte/"+id);
   return this.http.get<ReponseUrl>(this.authService.getSubDomain()+"/compte3/"+id+"/"+this.authService.getNomGroupe());
   }
   */
}
