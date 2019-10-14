import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {GroupeScolaireService} from "./services/groupe-scolaire.service";
import {environment} from "../environments/environment";
import {SessionStorageService} from "ngx-webstorage";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  nomDomaine = 'app';


  constructor(private router:Router, private authService:AuthService, private sessionSt: SessionStorageService ) {

    let nomDomaine = document.location.hostname;
    let nomSubDomain = nomDomaine.split(".");


   // console.log("domain", this.authService.getLogin());

    if(nomSubDomain[0] == 'admin' || nomSubDomain[0] == environment.domainName){
      //console.log('hhhh');
      this.authService.setLogin(nomSubDomain[0] );
      this.authService.destroySubDomain();
      this.authService.destroyNomGroupe();
      if(nomSubDomain[2] == null){
        this.authService.saveSubDomain('http://'+ nomSubDomain[0]+'.my-studeez.fr/api');

      }else{
        this.authService.saveSubDomain('http://'+ nomSubDomain[0]+'.'+nomSubDomain[1] +'.'+nomSubDomain[2]+'/api');

      }
      this.authService.saveNomGroupe("STUDEEZ");
      //this.router.navigate(['home']);
    }
    else
    {
      console.log('hahahah');


      this.authService.destroySubDomain();
      this.authService.destroyNomGroupe();

      if(nomSubDomain[2]==null){
        this.authService.saveSubDomain('http://'+ nomSubDomain[0]+'.my-studeez.fr/api');
        console.log('nomSubDomain',nomSubDomain);
      }else{
        this.authService.saveSubDomain('http://'+nomSubDomain[0]+'.'+ nomSubDomain[1] +'.'+nomSubDomain[2]+'/api');
      }
      this.authService.saveNomGroupe(nomSubDomain[0]);
      //this.sessionSt.store("nomgroupe",nomSubDomain[0]);
      //this.router.navigate(['home']);
     this.router.navigate(['connexion']);
      this.authService.setLogin(nomSubDomain[0]);
    }

  }

}
