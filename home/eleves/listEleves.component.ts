import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,Type} from '@angular/core';
import {EleveService} from "../../services/eleve.service";
import {EcoleService} from "../../services/ecole.service";
import {ClasseService} from "../../services/classe.service";
import {MatiereService} from "../../services/matiere.service";
import {ParentService} from "../../services/parent.service";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatiereOptionnnelleComponent} from "./matiere-optionnelle.component";
import {Eleve} from "../../models/eleve";

import 'jspdf-autotable';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
declare var jsPDF: any;


@Component
({
  selector: 'app-listEleves',
  templateUrl: './listEleves.component.html',

})

export class ListElevesComponent implements OnInit {

  // déclaration des variables
  id: any = '';
  nom: any = '';
  prenom: any = '';
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
  dateN: any = '';
  term:any ='';
  login: any = '';
  password: any = '';
  equalTo: any = '';
  confirmPassword: any = '';
  listEleve : any= {};
  eleves : any= '';
  e : any= {};
   nomE :any= {};
   idE :any= {};
   nomC :any= {};
   idEcole: any = '';
  idEleve: any = '';
  idClasse: any = '';
  idCompteUser: any = '';
  ecoles :any={};
  listClasses :any={};
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
  tmpeleve : any= {};
  tmpParent : any= {};
  empty=[];

  hide = true;

  selectedMatiere: string = '';
  listParentEleve: any = {};
  listMatiereEleve: any = {};
  _ref:any;
  value: string = '';

  @ViewChild('add_matiere_optionnelle', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private _cfr: ComponentFactoryResolver,private eleveService: EleveService, private ecoleService :EcoleService, private classeService :ClasseService , private matiereService :MatiereService ,private authService : AuthService,private http: HttpClient,private parentService:ParentService ) {

    // affichage liste des élèves
    this.listEleve = eleveService.getListElevesEcole();
    // affichage liste des écoles
    this.ecoleseleves = eleveService.getElevesEcoles();
    this.ecoles = ecoleService.getEcoles(authService.getNomGroupe());
    //affichage liste des classes
  //  this.listClasses = classeService.getClassesEcole();
    //affichage liste des matiéres optionnelles
    this.matieres = matiereService.getMatieresEcole();
    this.listParentEleve=eleveService.getParentEleve(this.id);
    this.listMatiereEleve=eleveService.getMatiereEleve(this.id);



  }
  ngOnInit()
  {
    //this.value=localStorage.getItem("whatever");
    this.addMatiereOptionnelle();
  //this.listMatieres=localStorage.getItem("ListMatieres");
  }

 // méthode suppresion élève seoln son 'id'
  deleteEleve(id) {

    console.log("delete eleve component id = " , id);
    this.eleveService.deleteEleve(id).subscribe(res => {

    });
    this.listEleve = this.eleveService.getListElevesEcole();
    console.log(this.listEleve);
  }
  modalSupp(tmpeleve){
    this.tmpeleve=tmpeleve;
  }



  ModalAfficheEleve(id,nom,prenom,adressePostale,INE,dateN,nomE,abrege,redoublant,provenance,dateEntree,dateSortie,motifSortie,
                    login,password)
  {
    this.id=id;
    console.log(id);
    this.nom=nom;
    this.prenom=prenom;
    this.adressePostale=adressePostale ;
    this.INE=INE ;
    this.dateN=dateN ;
    this.nomE=nomE ;
    this.abrege=abrege ;
    this.redoublant=redoublant ;
    this.provenance=provenance ;
    this.dateEntree=dateEntree ;
    this.dateSortie=dateSortie ;
    this.motifSortie=motifSortie ;
    this.login=login ;
    this.password=password ;

    this.listParentEleve = this.eleveService.getParentEleve(id);
    this.listMatiereEleve=this.eleveService.getMatiereEleve(this.id);

  }



  updateEleve(eleve)
  {
    console.log("update component " , eleve.id);

    this.eleveService.updateEleve(eleve);

    this.listEleve = this.eleveService.getListElevesEcole();

  }







  estNonVidee(chaine){
    if(chaine == ""){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }

  //importation en excel
  exportationExcel()
  {
    this.listEleve = this.eleveService.getElevesExcel(this.authService.getNomGroupe());
    this.listEleve = this.eleveService.getListElevesEcole();
  }

  //imprimer pdf
  generationPDF() {

    this.http.get<Eleve[]>(this.authService.getSubDomain()+"/eleves/"+this.authService.getNomGroupe()).subscribe(eleves =>
    {
      var columns = [
        {title: "Nom  ", dataKey: "nom"},
        {title: "Prenom", dataKey: "prenom"},

      ];

      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, eleves, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des eleves",128,15);
        }
      });

      doc.autoPrint()
      doc.save('eleves.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','ecoles.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });

  }

  selectMatiere (event: any)
  {

    localStorage.setItem('whatever', event.target.value);
    localStorage.setItem('ListMatieres', event.target.value);

    this.selectedMatiere = event.target.value;

  }
  /*selectNom (event: any)
  {
    this.selectedNom = event.target.value;
  }

  selectEcole (event: any)
  {
    this.selectedEcole = event.target.value;
  }
  selectEmail (event: any)
  {
    this.selectedEmail = event.target.value;
  }*/
//ajouter matiere optionnele pour l'élève
  addMatiereOptionnelle()
  {
    var comp = this._cfr.resolveComponentFactory(MatiereOptionnnelleComponent);
    var MatiereOptiComponent = this.container.createComponent(comp);
    MatiereOptiComponent.instance._ref = MatiereOptiComponent;

  }


  remove()
  {
    this._ref.destroy();
  }

  modalSupprimeParent(tmpParent){
    this.tmpParent=tmpParent;
  }


  deleteParent(id) {
    this.parentService.deleteParent(id).subscribe(res => {
    });
    //this.listParentEleve = this.parentService.getParentEleve(id);
    //console.log(this.listParentEleve);
  }
}
