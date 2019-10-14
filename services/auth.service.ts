import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Router} from "@angular/router";
import {User}   from '../models/user';
import {Observable} from 'rxjs/Observable';
import {SessionStorageService} from "ngx-webstorage";
import {BehaviorSubject} from 'rxjs/BehaviorSubject'




@Injectable()
export class AuthService {
  selectedgroup=new BehaviorSubject<any>({id:null})

  // les attribues
  private loggedIn:any='false';
  public  user: User;

  // le constructeur
  constructor(private http: HttpClient, private router: Router, private sessionSt: SessionStorageService) {


  }

  setgroupe(obj){
    console.log(obj);
    this.selectedgroup.next({id:obj})
  }
  getgroupe(){
    return this.selectedgroup.asObservable()
  }

  //getter et setter subdomain
  saveSubDomain(nomSubDomain: string){
    this.sessionSt.store("subdomain",nomSubDomain);
  }
  getSubDomain(): string{
    return 'http://my-studeez.fr/api';
    //return this.sessionSt.retrieve("subdomain");
  }
  destroySubDomain(){
    this.sessionSt.clear("subdomain");
  }

  //----------------------------------------------getter et setter Nomgroupe ou  nom base de données//////

  saveNomGroupe(nomGroupe:string){
    this.sessionSt.store("nomGroupe",nomGroupe);
  }
  destroyNomGroupe(){
    this.sessionSt.clear("nomGroupe");
  }
  getNomGroupe(){
    return this.sessionSt.retrieve("nomG");
  }
  setNomGroupe(i){
    this.sessionSt.store("nomG", i);
  }

  //--------------------------------------------------------------------------//

  getUser(){
    return this.user;
  }
  setUser(userApi:User){
    this.user = userApi;
  }

  setConnectedUser(i){
    this.sessionSt.store("User", i);
  }

  getConnectedUser(){
    return this.sessionSt.retrieve("User");
  }

//////////////////////////////////////////
  getUserLoggedIn(){
    return this.loggedIn;
  }
  setUserLoggedIn(){
    this.loggedIn = true;
  }

////////////////////////////////////////////////////////////
  setLogin(i){
    this.sessionSt.store("Login", i);
  }

  getLogin(){
    return this.sessionSt.retrieve("Login");
  }


/////////////////////////////////////////////////////////////////


  saveIdEcole(idE:number){
    this.sessionSt.store("idE",idE);
  }
  destroyIdEcole(){
    this.sessionSt.clear("idE");
  }
  setIdSelectedEcole(i){

    this.sessionSt.store("idSelectedEcole",i);
    //this.sessionSt.store("nomE", i);

  }

  getIdSelectedEcole()
  {
    return this.sessionSt.retrieve("idSelectedEcole");
    //return this.sessionSt.retrieve("nomE");
  }
//////////////////////////////////////////////////////////////


  // methode pour l'authentification des admins des plateforms

  loginUserPlateform(email: string, password: string){


    this.http.post( this.getSubDomain() + '/auth/sign_in_user_plateform', {
      login: email,
      password: password

    }).subscribe((resp: any) => {

      this.setLogin('admin');
      this.setUser(resp.user);



      this.setConnectedUser(resp.user);

      //navigate
      this.router.navigate(['home']);

    }, (errorResp) => {
      console.log("error");

    });
  }




/////log out
  wissemlogoutUser(){

//make get synchrone with map
    this.http.get(this.getSubDomain()+"/sign_out1").map((res:Response) => res).subscribe(data => {

      this.router.navigate(['admin']);
    });

  }


  loginUserGroupe(email: string, password: string){
    this.http.post(this.getSubDomain() + '/auth/sign_in_user_groupe', {
      login: email,
      password: password,
      nomGroupe  : this.getNomGroupe()

    }).subscribe((resp: any) => {
      this.setUserLoggedIn();


      this.setUser(resp.user);


      this.router.navigate(['home-groupe-scolaire']);

    }, (errorResp) => {
      console.log("error");
      console.log(errorResp);
      this.loggedIn = false;
      //this.router.navigate(['']);
    });
  }



  logoutUser() {

    //this.destroyToken();
    //this.destroyNomGroupe();
    //this.destroySubDomain();

    //this.loggedIn = false;

    localStorage.clear();
    this.http.get(this.getSubDomain()+"/sign_out1");

    this.router.navigate(['admin']);




    //console.log("log ouuuuuut",this.getSubDomain()+"/sign_out1");
  }



}
