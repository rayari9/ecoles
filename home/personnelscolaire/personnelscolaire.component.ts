import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, NgModule} from '@angular/core';
import {EleveService} from "../../services/eleve.service";
import {EcoleService} from "../../services/ecole.service";
import {ClasseService} from "../../services/classe.service";
import {MatiereService} from "../../services/matiere.service";
import {AuthService} from "../../services/auth.service";


import {BrowserModule} from "@angular/platform-browser";
import{HttpClient} from '@angular/common/http';
import {CompteProService} from "../../services/comptePro.service";

import 'jspdf-autotable';
declare var jsPDF: any;

@Component
({
  selector: 'app-personnelscolaire',
  templateUrl: './personnelscolaire.component.html',
  styleUrls: ['./personnelscolaire.component.css'],
})

@NgModule({
  imports: [ BrowserModule ],
  entryComponents: [],
  declarations: [ PersonnelscolaireComponent],
  bootstrap: [ PersonnelscolaireComponent]
})

export class PersonnelscolaireComponent implements OnInit {
  dateDeconx: any='';
  connectedUser:any='';
  tmppersonel : any= {};
  // déclaration des variables
  id: any = '';
  nom: any = '';
  pathavatar: any = '';
  avatar: any = '';
  prenom: any = '';
  ecoleRattachee: any = '';
  civilite: any = '';
  fonction: any = '';
  isAdmin: any = '';
  tel1: any = '';
  code_postal: any = '';
  tel2: any = '';
  estAdmin: any = '';
  adressePostale: any = '';
  complement_adresse: any = '';
  ville: any = '';
  email: any = '';
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
  password2='';

  accueil: any = '';
  messagerieInt: any = '';
  messagerieExt
  rdv
  calendrierScol
  docAdm
  docAdmRenvoy
  tabAff
  emploi
  reservation
  cours
  traveauxARendre
  appelEnSalle
  suivieJustif
  saisieJustif
  bilanAbsence
  code_postale: any = '';
  equalTo: any = '';
  confirmPassword: any = '';
  listEleve : any= {};
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
  tmpeleve : any= {};
  personels:any={};
  classesParEcole:any={}
  empty=[];


  data:any=[];
  hide = true;
  selectedMatiere: string = '';
  selectedNom: string = '';
  selectedEcole: string = '';
  selectedEmail: string = '';
  listMatieres: string = '';
  selectModel:any='';
  successAdd: any = '';
  selectedFile: File= null;
  checkboxFlag:boolean = true;
  disabledbutton: any='';





// Keep track of list of generated components for removal purposes
  components = [];
  components2 = [];
  constructor(private _cfr: ComponentFactoryResolver,private personnelservice:CompteProService ,private eleveService: EleveService, private ecoleService :EcoleService, private classeService :ClasseService , private matiereService :MatiereService ,private authService : AuthService,private http: HttpClient ) {


    this.ecoles = ecoleService.getEcoles(authService.getNomGroupe());

    //affichage liste des classes
    this.classes = classeService.getClasses();
    //affichage liste des matiéres optionnelles
    this.matieres = matiereService.getMatieres();
    let dateValue=Date.parse( this.connectedUser['derniereCnx']);
    this.dateDeconx=new Date(dateValue).toLocaleString();
  }
  UploadDisable(){

    this.checkboxFlag = !this.checkboxFlag;
    console.log(this.checkboxFlag);
    if(this.checkboxFlag){//si on choisir la personalisation par défaut alors on desactive les champs des uploads d'images
      this.disabledbutton = 'disabledbutton'; //afectation de classe disabledbutton aux champs d'uploads
    }else{
      this.disabledbutton = '';
    }

  }
  onavatarSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post('http://admin.localhost:3000/api/upload',fd).subscribe(res =>{
      console.log("res",res);
      // (<HTMLInputElement>document.getElementById("path").value) = res.name;
      this.pathavatar=res;
    })
  }
  onFileSelected(event){
    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post('http://admin.localhost:3000/api/upload',fd).subscribe(res =>{
      console.log("res",res);
      this.pathavatar=res;
    })
  }
  ngOnInit() {
    const $ = window["$"];
    $(function () {
      $('#BSbtndanger').filestyle({
        buttonName : 'btn-danger',
        buttonText : ' <img src="../../../assets/images/picto_modifier.png" class="file_image">' +
        '<img src="../../../assets/images/vignette.png" class="file_image">'
      });



      $('[data-toggle="tooltip"]').tooltip({animated: 'fade',
        placement: 'right',
        html: true})
    });

    $(document).ready(function() {
      $('#clickInfo').on('click', function () {
        $('a[href="#Droits"]').trigger('click');
      });
    });
  }
  viewListPerso(event){

    console.log("Event id ecole ",event.target.value);


    this.authService.setIdSelectedEcole(event.target.value);
    this.personnelservice.getListPersonnelsEcole().subscribe(res=>{
      this.data=res
      console.log(this.data)
    })



  }

  /*  AddEleve(eleve){
      console.log(eleve);
      this.eleveService.AddEleve(eleve);
      this.listEleve = this.eleveService.getListElevesEcole();
      //this.router.navigate(['home']);

    }*/
  ajouterPersonnelScolaire(personnel){
    console.log(personnel);
  this.personnelservice.ajouterPersonnel(personnel)

  setTimeout(()=>{
    this.successAdd="Nouveau personnel scolaire «"+personnel.nom+"» enregistré";
    this.personnelservice.getListPersonnelsEcole().subscribe(res=>{
      this.data=res

    })
  },2000);
  setTimeout(()=>{
    this.successAdd=" ";
  },5000);
}
  getPersonnel(id,avatar,civilite,nom,prenom,ecole,fonction,admin,tel1,tel2,addresse,complement,ville,codeP,email,pwd){
    this.id=id;
    this.avatar=avatar;
    this.civilite=civilite;
    this.nom=nom;
    this.prenom=prenom;
    this.nomE=ecole;
    this.fonction=fonction;
    this.estAdmin=admin;
    this.tel1=tel1;
    this.tel2=tel2;
    this.adressePostale=addresse;
    this.complement_adresse=complement;
    this.ville=ville;
    this.code_postal=codeP;
    this.email=email;
    this.password=pwd;
  }
  modifPersonnelScolaire(personnel)
  {}
  DeletePersonnel(id){
this.personnelservice.deletePersonnel(id).subscribe(res => {
  this.personnelservice.getListPersonnelsEcole().subscribe(res=>{
    this.data=res
    console.log(this.data)
  })
});

  }
  Effacer_Recherche(){
    this.term='';
  }

  modifierPersonnel(nom,prenom){
    this.nom=nom;
    this.prenom=prenom;
  }
  modalSupp(tmppersonel){

    console.log("modal supp  "  , tmppersonel);
    this.tmppersonel=tmppersonel;
  }


  estNonVidee(chaine){
    if(chaine == null ||chaine==''){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }
  onupPhotoEtablissementSelected(event){
    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authService.getSubDomain()+"/upload",fd).subscribe(res =>{//appeler service d'upload l'image et retourner le nom comme resultat
      console.log("res",res);
      this.pathavatar=res;
    })
  }

  //imprimer pdf
/*  generationPDF() {

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

  exportationExcel(){
    this.matieres = this.matiereService.getMatieresExcel(this.authService.getNomGroupe());
    console.log(this.matieres);
  }*/
}
