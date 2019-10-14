import { Component, OnInit } from '@angular/core';
import {GroupeScolaireService} from "../services/groupe-scolaire.service";
import {AuthService} from "../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {Ecoles} from "../models/ecoles";

@Component({
  selector: 'app-connexion-groupe',
  templateUrl: './connexion-groupe.component.html',
  styleUrls: ['./connexion-groupe.component.css']
})
export class ConnexionGroupeComponent implements OnInit {

  public ecoles : any;
  public ecoleSelectionne : any;
  public src :any;
  public emailMessageErreur: any;
  public MessageErreur: any;
  public groupeScolaire :any;
  public ImagePageConnexionParDefaut : any;

  public srcLogo : any;
  public srcLogoParDefaut: any;
  public isHidden : any;

  public motDirecteur : string;
  public imageDirecteur : string;
  public chefEtablissement: any;



//------------------------------------------------------------------------------------------------------------------------------ Constructeur
  constructor(private groupeService : GroupeScolaireService, private authService : AuthService, private http: HttpClient) {

   this.ecoles = this.groupeService.getEcoles(authService.getNomGroupe());
   //console.log('ecoles');
   //console.log(this.ecoles);

    //this.groupeScolaire = this.groupeService.getGroupeScolaire_precise(authService.getNomGroupe());
     //console.log(this.groupeService.getGroupeScolaire_precise(authService.getNomGroupe()));

    this.http.get(this.authService.getSubDomain()+"/groupe_scolaire_precise/"+authService.getNomGroupe())
      .toPromise()
      .then(response => {
        this.isHidden = true;
        this.groupeScolaire = response;
        this.ImagePageConnexionParDefaut = "../../../assets/images/"+this.groupeScolaire.imagePageConx;
        this.srcLogoParDefaut            = "../../../assets/images/"+this.groupeScolaire.logoPageConx;
        this.src                         =  "../../../assets/images/"+this.groupeScolaire.imagePageConx;     //this.groupeService.getGroupeScolaire_precise(authService.getNomGroupe());
        this.srcLogo                     = "../../../assets/images/"+this.groupeScolaire.logoPageConx;
      })
      .catch(console.log);





  }

  //---------------------------------------------------------------------------------------------------------------------------------

  ngOnInit() {
  }

//------------------------------------------------------------------------------------------------------------------------------ Validation emails
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------  login user groupe scolaire
  loginUser(c) {
    console.log(c);
    var email = c.email ;
    var password = c.password;

    console.log(this.validateEmail(email));

    if(this.validateEmail(email) == true){
      this.emailMessageErreur = "";
      this.authService.loginUserGroupe(email, password);

      console.log(this.authService.getUserLoggedIn())

      if (!this.authService.getUserLoggedIn()) {
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
//------------------------------------------------------------------------------------------------------------------------------ fin login user scolaire
  //------------------------------------------------------------------------------------------------------------------------------  method de changement d'ecole
  chargerEcole(idEcole){
  //this.ecoleSelectionné = this.groupeService.getEcoleSelectionner(this.authService.getNomGroupe(), idEcole);
    this.http.get(this.authService.getSubDomain()+'/ecoleSelectionner/'+this.authService.getNomGroupe()+'/'+idEcole )
      .toPromise()
      .then(response => {
        console.log(response);
        this.ecoleSelectionne = response;
        if (idEcole != 0 ){
           this.src           = this.ecoleSelectionne.photoEtablissement;
           this.srcLogo       = this.ecoleSelectionne.logoPageCnx;
           this.isHidden      = false;
           this.motDirecteur  = this.ecoleSelectionne.presentation;

          this.http.get(this.authService.getSubDomain()+"/compte_user_precise/"+this.authService.getNomGroupe()+"/"+Number(this.ecoleSelectionne.chefEtablissement))
            .toPromise()
            .then(response => {

              this.chefEtablissement = response;
              this.imageDirecteur    =  "../../../assets/uploads/"+this.chefEtablissement.avatar

            })
            .catch(console.log);



        }
        else{
          this.src           = this.ImagePageConnexionParDefaut;
          this.srcLogo       = this.srcLogoParDefaut;
          this.isHidden      = true;
          this.motDirecteur  = '';
        }


      })
      .catch(console.log);
  //this.src = this.ecoleSelectionné.photoEtablissement;
  //console.log(this.src);
  }
  getEcoles(nomGroupe) {
    return this.http.get<Ecoles[]>(this.authService.getSubDomain()+"/ecoles_Groupe_Scolaire/"+nomGroupe);
  }

//------------------------------------------------------------------------------------------------------------------------------  fin method de changement

}
