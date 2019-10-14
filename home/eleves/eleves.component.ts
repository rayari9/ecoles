import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, NgModule} from '@angular/core';
import {EleveService} from "../../services/eleve.service";
import {EcoleService} from "../../services/ecole.service";
import {ClasseService} from "../../services/classe.service";
import {MatiereService} from "../../services/matiere.service";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatiereOptionnnelleComponent} from "./matiere-optionnelle.component";
import {ListElevesComponent} from "./listEleves.component";
import {BrowserModule} from "@angular/platform-browser";

import 'jspdf-autotable';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ParentService} from "../../services/parent.service";
import {Eleve} from "../../models/eleve";
declare var jsPDF: any;

@Component
({
  selector: 'app-eleves',
  templateUrl: './eleves.component.html',
  styleUrls: ['./eleves.component.css'],
})

export class ElevesComponent implements OnInit {

  // déclaration des variables
  id: any = '';
  nom: any = '';
  prenom: any = '';
  dateN: any = '';
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
  listEleve : any= {};
  listClasses : any= {};
  eleves : any= '';
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
  empty=[];
  hide = true;
  selectedMatiere: string = '';
  selectedNom: string = '';
  selectedEcole: string = '';
  selectedEmail: string = '';
  listMatieres: string = '';
  selectModel:any='';
  successAdd: any='';
  idE: any='';
  tmpeleve : any= {};
  tmpParent : any= {};
  listParentEleve: any = {};
  listMatiereEleve: any = {};
  _ref:any;
  value: string = '';

  connectedUser:any='';
  dateDeconx: any='';

  @ViewChild('form')
  private form: FormGroup;

  @ViewChild('add_matiere_optionnelle', { read: ViewContainerRef }) container: ViewContainerRef;
   // @ViewChild('listEleves', {read: ViewContainerRef}) containerr: ViewContainerRef;

  // ListElevesComponent = ListElevesComponent;
  // Keep track of list of generated components for removal purposes
  components = [];
  constructor(private _cfr: ComponentFactoryResolver,private eleveService: EleveService, private ecoleService :EcoleService, private classeService :ClasseService , private matiereService :MatiereService ,private authService : AuthService ,private http: HttpClient,private parentService:ParentService) {


    //this.authService.getIdSelectedEcole();
    // affichage liste des élèves
    this.listEleve = '';
    // affichage liste des écoles
    this.ecoleseleves = eleveService.getElevesEcoles();
    this.ecoles = ecoleService.getEcoles(authService.getNomGroupe());
    //affichage liste des classes
    //affichage liste des matiéres optionnelles
    this.matieres = matiereService.getMatieres();
    this.listParentEleve=eleveService.getParentEleve(this.id);
    this.listMatiereEleve=eleveService.getMatiereEleve(this.id);

    //affichage liste des classes
   // this.listClasses = this.classeService.getClassesEcole();
    //affichage liste des matiéres optionnelles
    //this.matieres = matiereService.getMatieres();


    //date dernière connexion
    this.connectedUser=authService.getConnectedUser();
    let dateValue=Date.parse( this.connectedUser['derniereCnx']);
    this.dateDeconx=new Date(dateValue).toLocaleString();
    console.log("date deconx",this.dateDeconx);

  }
  ngOnInit() {

    const $ = window["$"];
    $(function () {
      $('#BSbtndanger').filestyle({
        buttonName : 'btn-danger',
        buttonText : ' <img src="../../../assets/images/picto_modifier.png" class="file_image">' +
        '<img src="../../../assets/images/vignette.png" class="file_image">'
      });
      $('[data-toggle="tooltip"]').tooltip();
    });

    //vider les champs aprés l'ajout d'un matière

    $(function(){
      $('#buttonAdd').click(function(){
        $(":input","#f")
          .not(':button, :submit, :reset, :hidden ')
          .val('')
          .removeAttr('checked')
          .removeAttr('selected');
        $( ":span","#f").val( '' );
      });
    });

    this.addMatiereOptionnelle();
    this.listMatieres=localStorage.getItem("ListMatieres");
    //this.idE=setIdSelectedEcole(event.target.value);

    //vider les champs aprés l'ajout

    $(function(){
      $('#buttonAdd').click(function(){
        $(":input","#formaAddEleve")
          .not(':button, :submit, :reset, :hidden ')
          .val('')
          .removeAttr('checked')
          .removeAttr('selected');
        $( ":span","#formaAddEleve").val( '' );
      });
    });

  }
  AddEleve(eleve){
    console.log(eleve);
   this.eleveService.AddEleve(eleve);

    //this.router.navigate(['home']);

    this.successAdd="Nouveau élève «"+eleve.nom+"» enregistré";
    setTimeout(()=>{
      this.successAdd=" ";
    },3000);



    setTimeout(()=>{
      this.listEleve = this.eleveService.getListElevesEcole();
    },3000);

  }
  estNonVidee(chaine){
    if(chaine == ""){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }

  //event handler for the select element's change event
  selectMatiere (event: any)
  {

    localStorage.setItem('whatever', event.target.value);
    localStorage.setItem('ListMatieres', event.target.value);

    this.selectedMatiere = event.target.value;

  }
  selectNom (event: any)
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
  }
//ajouter matiere optionnele pour l'élève
  addMatiereOptionnelle()
  {
    var comp = this._cfr.resolveComponentFactory(MatiereOptionnnelleComponent);
    var MatiereOptiComponent = this.container.createComponent(comp);
    MatiereOptiComponent.instance._ref = MatiereOptiComponent;

  }

  // list des matieres selon id  d'ecole selectionner
  viewListEleves(event){
    console.log("event",event.target.value);
    this.authService.setIdSelectedEcole(event.target.value);

    console.log("auth service selected ecole ",this.authService.getIdSelectedEcole());
    this.listEleve = this.eleveService.getListElevesEcole();
    this.idE=this.authService.getIdSelectedEcole();


  }

  isSelected(id){

    if (id === Number(this.authService.getIdSelectedEcole())){
      return true;

    }
    return false;
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
  Effacer_Recherche(){
    this.term='';
  }

}
