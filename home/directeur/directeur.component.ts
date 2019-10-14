import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, NgModule} from '@angular/core';
import {EleveService} from "../../services/eleve.service";
import {EcoleService} from "../../services/ecole.service";
import {ClasseService} from "../../services/classe.service";
import {MatiereService} from "../../services/matiere.service";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ListDirecteursComponent} from "./listDiretcteurs.component";
import {BrowserModule} from "@angular/platform-browser";
import{HttpClient} from '@angular/common/http';
import {CompteProService} from "../../services/comptePro.service";
import {Personnels} from "../../models/Personnels";
import 'jspdf-autotable';
declare var jsPDF: any;
@Component
({
  selector: 'app-directeur',
  templateUrl: './directeur.component.html',
  styleUrls: ['./directeur.component.css'],
})

@NgModule({
  imports: [ BrowserModule ],
  entryComponents: [ListDirecteursComponent],
  declarations: [ DirecteurComponent, ListDirecteursComponent],
  bootstrap: [ DirecteurComponent]
})

export class DirecteurComponent implements OnInit {
// nouvelles declarations

  dateDeconx: any='';


  // déclaration des variables
  id: any = '';
  avatar: any = '';
  nom: any = '';
  prenom: any = '';
  fonction: any = '';
  email: any = '';
  tel1: any = '';
  tel2: any = '';
  ville: any = '';
  code_postal: any = '';
  estAdmin: any = '';
  complement_d_adresse: any = '';
  INE: any = '';
  civilite: any = '';
  adressePostale: any = '';
  complement_adresse: any = '';
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
  pathavatar: any = '';
  empty=[];
  hide = true;
  selectedMatiere: string = '';
  selectedNom: string = '';
  selectedEcole: string = '';
  selectedEmail: string = '';
  listMatieres: string = '';
  selectModel:any='';
  selectedFile: File= null;
  pathImageSigniature: any='';
  disabledbutton: any='';
  checkboxFlag:boolean = true;
  tmpdirecteur : any= {};
  radioestAdmin: any= {};
  pathImagePageCx: any='';

  successAdd: any = '';
  connectedUser:any='';
  passwordC:any='';
  data:any=[];

  ListDirecteursComponent = ListDirecteursComponent;
// Keep track of list of generated components for removal purposes
  components = [];
  constructor(private _cfr: ComponentFactoryResolver,private eleveService: EleveService,private directeurService: CompteProService, private ecoleService :EcoleService, private classeService :ClasseService , private matiereService :MatiereService ,private authService : AuthService,private http: HttpClient ) {


    this.ecoles = ecoleService.getEcoles(authService.getNomGroupe());
    //affichage liste des classes
    this.classes = classeService.getClasses();
    //affichage liste des matiéres optionnelles
    this.matieres = matiereService.getMatieres();
    this.connectedUser=authService.getConnectedUser();
    let dateValue=Date.parse( this.connectedUser['derniereCnx']);
    this.dateDeconx=new Date(dateValue).toLocaleString();
  }

  UploadDisable(){

    this.checkboxFlag = !this.checkboxFlag;
    console.log(this.checkboxFlag);
    if(this.checkboxFlag){//si on choisir la personalisation par défaut alors on desactive les champs des uploads d'images
      this.disabledbutton = 'disabledbutton'; //afectation de classe disabledbutton aux champs d'uploads
    }
    else{
      this.disabledbutton = '';
    }

  }
  onFileSelected(event){
    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post('http://admin.localhost:3000/api/upload',fd).subscribe(res =>{
      console.log("res",res);
      this.pathImagePageCx=res;
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
      $('#BSbtndangerModig').filestyle({
        buttonName : 'btn-danger',
        buttonText : ' <img src="../../../assets/images/picto_modifier.png" class="file_image">' +
        '<img src="../../../assets/images/vignette.png" class="file_image">'
      });


      $('[data-toggle="tooltip"]').tooltip({animated: 'fade',
        placement: 'right',
        html: true})
    });

  }

  /*  AddEleve(eleve){
   console.log(eleve);
   this.eleveService.AddEleve(eleve);
   this.listEleve = this.eleveService.getListElevesEcole();
   //this.router.navigate(['home']);

   }*/

  ajouterDirecteur(personnel){

    console.log(personnel);
    this.directeurService.ajouterDirecteur(personnel);
    //this.router.navigate(['home']);
    setTimeout(()=>{
      this.successAdd="Nouveau directeur «"+personnel.nom+"» enregistré";
      this.directeurService.getListDirecteursEcole().subscribe(res=>{
        this.data=res
        console.log(this.data)
      })
    },2000);
    setTimeout(()=>{
      this.successAdd=" ";
    },5000);

  }
  modifierDirecteur(personnel){
    console.log(personnel)

    this.directeurService.modifierDirecteur(personnel)

    setTimeout(()=>{
      this.successAdd="Directeur «"+personnel.nom+"» modifié";
      this.viderDirecteur();
      this.directeurService.getListDirecteursEcole().subscribe(res=>{
        this.data=res
        console.log(this.data)
      })
    },2000);
    setTimeout(()=>{
      this.successAdd=" ";
    },5000);

  }
  viewListDirecteurs(event){

    this.authService.setIdSelectedEcole(event.target.value);

    this.directeurService.getListDirecteursEcole().subscribe(res=>{
      this.data=res
      console.log(this.data)
    })

  }
  onImgSign(event){

    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post('http://admin.localhost:3000/api/upload',fd).subscribe(res =>{
      console.log("res",res);
      // (<HTMLInputElement>document.getElementById("path").value) = res.name;
      this. pathImageSigniature=res;
    })
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
  Effacer_Recherche(){
    this.term='';
  }

  estNonVidee(chaine){
    if(chaine == null ||chaine==''){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }

  generationPDF() {

    this.http.get<Personnels[]>(this.authService.getSubDomain()+"/personnels_Excel/"+this.authService.getNomGroupe()).subscribe(directeurs =>
    {
      var columns = [
        {title: "Nom  ", dataKey: "nom"},
        {title: "Prenom", dataKey: "prenom"},
        {title: "Adresse", dataKey: "adressePostal"},
        {title: "Email", dataKey: "email"},
        {title: "Numéro de télèphone", dataKey: "tel1"},

      ];

      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, directeurs, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des directeurs",128,15);
        }
      });

      doc.autoPrint()
      doc.save('directeurs.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','ecoles.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });

  }

  modalSupp(tmpdirecteur){

    console.log("modal supp  "  , tmpdirecteur);
    this.tmpdirecteur=tmpdirecteur;
  }

  DeleteDirecteur(id) {
    this.directeurService.deletePersonnel(id).subscribe(res => {
      this.directeurService.getListDirecteursEcole().subscribe(res=>{
        this.data=res
        console.log(this.data)
      })
    });


  }

  getDirecteur(id,avatar,civilite,nom,prenom,ecole,fonction,admin,tel1,tel2,addresse,complement,ville,codeP,email,pwd){
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
  viderDirecteur(){
    this.avatar='';
    this.civilite='';
    this.nom='';
    this.prenom='';
    this.idEcole='';
    this.fonction='';
    this.estAdmin='';
    this.tel1='';
    this.tel2='';
    this.adressePostale='';
    this.complement_adresse='';
    this.ville='';
    this.code_postal='';
    this.email='';
    this.password='';

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

  exportationDirecteurExcel(){

  }


}
