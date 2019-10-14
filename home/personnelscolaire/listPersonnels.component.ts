import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,Type} from '@angular/core';
import {EleveService} from "../../services/eleve.service";
import {EcoleService} from "../../services/ecole.service";
import {ClasseService} from "../../services/classe.service";
import {MatiereService} from "../../services/matiere.service";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";



import {HttpClient} from "@angular/common/http";
import {CompteProService} from "../../services/comptePro.service";
import {Personnels} from "../../models/Personnels";
import 'jspdf-autotable';

declare var jsPDF: any;

@Component
({
  selector: 'app-listPersonnels',
  templateUrl: './listPersonnels.component.html',

})

export class ListPersonnelsComponent implements OnInit {

  // déclaration des variables
 // id: any = '';

  nom: any = '';
  prenom: any = '';
  avatar: any = '';
  INE: any = '';
  civilite: any = '';
  adressePostale: any = '';
  signature: any = '';
  presentation: any = '';
  penseBete: any = '';
  genre: any = '';
  creePar: any = '';
  modifiePar: any = '';
  createdAt: any = '';
  updatedAt: any = '';
  idCU: any = '';
  term:any ='';
  login: any = '';
  password: any = '';
  equalTo: any = '';
  confirmPassword: any = '';
  personnels : any= {};
  listPersonnels : any= '';
  e : any= {};
   nomE :any= {};
   idEcole: any = '';
  idEleve: any = '';
  idClasse: any = '';
  idCompteUser: any = '';
  ecoles :any={};
  matieres :any={};
  ecoleseleves :any={};
  abrege: any = '';
  dateSortie: any = '';
  motifSortie: any = '';
  dateEntree: any = '';
  redoublant: any = '';
  provenance: any = '';
  infoParents: any = '';
  nomMatiere: any = '';
  idMatiere: any = '';
  //count: any = '';
  classes : any= {};
  tmppersonel : any= {};
  empty=[];

  hide = true;

  constructor(private _cfr: ComponentFactoryResolver,private eleveService : EleveService,private personnelService: CompteProService, private ecoleService :EcoleService, private classeService :ClasseService , private matiereService :MatiereService ,private authService : AuthService,private http: HttpClient, ) {

    // affichage liste des élèves
    this.listPersonnels = personnelService.getListPersonnelsEcole();
    console.log("Personnels" , this.listPersonnels);

    // affichage liste des écoles
    this.ecoleseleves = eleveService.getElevesEcoles();

    this.ecoles = ecoleService.getEcoles(authService.getNomGroupe());

    //affichage liste des classes
    this.classes = classeService.getClasses();

    //affichage liste des matiéres optionnelles
    this.matieres = matiereService.getMatieresEcole();

  }
  ngOnInit()
  {

  }


  estNonVidee(chaine){
    if(chaine == null ){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }



  modalSupp(tmppersonel){

    console.log("modal supp  "  , tmppersonel);
    this.tmppersonel=tmppersonel;
  }

  /////////Supprimer Personnel
  DeletePersonnel(id) {
    this.personnelService.deletePersonnel(id).subscribe(res => {
      //console.log(res);
    });
    this.listPersonnels =  this.personnelService.getListPersonnelsEcole();
  }
  modifierPersonnel(nom,prenom){
    this.nom=nom;
    this.prenom=prenom;
  }
  //importation en excel
/*  exportationExcel()
  {
    this.listPersonnels = this.listPersonnels.getPersonnelExcel(this.authService.getNomGroupe());
    this.listPersonnels = this.listPersonnels.getListPersonnelsEcole();
  }*/

  //imprimer pdf
  generationPDF() {

    this.http.get<Personnels[]>(this.authService.getSubDomain()+"/personnel/"+this.authService.getNomGroupe()).subscribe(personnels =>
    {
      var columns = [
        {title: "Nom  ", dataKey: "nom"},
        {title: "Prenom", dataKey: "prenom"},
        {title: "Adresse", dataKey: "adressePostale"},
        {title: "Email", dataKey: "email"},
        {title: "Numéro de télèphone", dataKey: "tel1"},

      ];

      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, personnels, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des personnels",128,15);
        }
      });

      doc.autoPrint()
      doc.save('personnels.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','ecoles.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });

  }
}
