import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import {AuthService} from "./services/auth.service";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map'




@Injectable()
export class AuthGuard implements CanActivate {
  messagee:any=[];


  constructor(private http: HttpClient,  private auth:  AuthService, private router: Router){


  }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    //var myvar= localStorage.getItem("sessionStorageLoged");

    this.http.get(this.auth.getSubDomain()+"/authguard").map((res:Response) => res).subscribe(dataa => {

      //this.messagee=dataa;

      // console.log("message",Object.keys(dataa));
      // console.log("message in subscribe",(dataa["message"]));

      //console.log("messageee",dataa);
      console.log("this.auth.getLogin()",this.auth.getLogin());
      if(this.auth.getLogin()!='admin'){
        console.log("this.auth.getLogin() aaa",this.auth.getLogin());
        this.router.navigate(['connexion']);
        return true;

      }else{


        if(dataa["message"]== 'ok'){


          console.log("user loged in auth guards");

          return true;

        }else {
          console.log("user not loged in auth guards");
          //this.router.navigate(['admin']);
          window.location.reload();
          return false;
        }

      }



    });
    return true;

  }
}

/*
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

 if(this.auth.getUserLoggedIn()){
 console.log("authgard true");
 return true;
 }
 else{
 // not logged in so redirect to login page with the return url
 console.log(this.auth.getLogin());

 if(this.auth.getLogin()=='admin'){
 console.log("admin");
 this.router.navigate(['admin']);
 }
 else{
 console.log("connexion");
 this.router.navigate(['connexion']);
 }

 return false;
 }


 }*/
