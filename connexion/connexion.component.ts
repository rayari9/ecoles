import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  email    :string;
  password :string;
  emailMessageErreur : string ='';
  MessageErreur : string = '';

  constructor(private http: HttpClient,private router:Router, private auth:AuthService) {

  }



  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  loginUser(c) {

    //console.log(c.login);
    // console.log(c);
    //console.log(c);
    var email = c.email ;
    var password = c.password;

    //console.log(this.validateEmail(email));

    if(this.validateEmail(email) == true){

      this.emailMessageErreur = "";
      this.auth.loginUserPlateform(email, password);

      if (!this.auth.getUserLoggedIn()) {
        this.MessageErreur = "email ou mot de passe incorrect";
      }
      else {
        this.MessageErreur = "";
      }
    }
    else
    {
      this.emailMessageErreur = "email non valide";
      this.MessageErreur = "";
    }
  }




  /*
   auth(){

   this.signin.addTask(newTask)
   .subscribe(task => {
   this.tasks.push(task);
   this.title = '';
   });
   }
   */

  ngOnInit() {
    // var myvar =  localStorage.getItem("sessionStorageLoged");
//console.log("vaaar session storage ng init ",myvar);
    this.http.get(this.auth.getSubDomain()+"/authguard").subscribe(dataa => {





      if(dataa["message"]== 'ok'){


        console.log("Navigated back to home!");
        this.router.navigate(['home']);



      }else {
        console.log("user not loged in auth guards");
        this.router.navigate(['admin']);
      }





    });

  }
}
