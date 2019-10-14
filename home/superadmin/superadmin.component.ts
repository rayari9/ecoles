
import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, NgModule} from '@angular/core';
import {EleveService} from "../../services/eleve.service";
import {EcoleService} from "../../services/ecole.service";
import {ClasseService} from "../../services/classe.service";
import {MatiereService} from "../../services/matiere.service";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ListSuperAdminComponent} from "./listSuperAdmin.component";
import {BrowserModule} from "@angular/platform-browser";
import {CompteProService} from "../../services/comptePro.service";
import{HttpClient} from '@angular/common/http';
@Component
({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})

@NgModule({
  imports: [ BrowserModule ],
  entryComponents: [ListSuperAdminComponent],
  declarations: [ SuperAdminComponent, ListSuperAdminComponent],
  bootstrap: [ SuperAdminComponent]
})

export class SuperAdminComponent implements OnInit {
  listSuperAdmins : any= '';
  // déclaration des variables
  id: any = '';
  nom: any = '';
  prenom: any = '';
  email: any = '';
  tel1: any = '';
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
  empty=[];
  hide = true;
  selectedMatiere: string = '';
  selectedNom: string = '';
  selectedEcole: string = '';
  selectedEmail: string = '';
  listMatieres: string = '';
  selectModel:any='';
  pathavatar: any = '';
  tmpsuperadmin : any= {};
  @ViewChild('form')
  private form: FormGroup;
  successAdd: string = '';
  selectedFile: File= null;



  constructor(private _cfr: ComponentFactoryResolver,private eleveService: EleveService, private ecoleService :EcoleService, private classeService :ClasseService ,private http: HttpClient, private matiereService :MatiereService ,private authService : AuthService,private SAService:CompteProService  ) {


    this.ecoles = ecoleService.getEcoles(authService.getNomGroupe());
    //affichage liste des classes
    this.classes = classeService.getClasses();
    //affichage liste des matiéres optionnelles
    this.matieres = matiereService.getMatieres();

  }
  ngOnInit() {
    //this.listMatieres=localStorage.getItem("ListMatieres");

  }
  /*  AddEleve(eleve){
   console.log(eleve);
   this.eleveService.AddEleve(eleve);
   this.listEleve = this.eleveService.getListElevesEcole();
   //this.router.navigate(['home']);

   }*/
  ajouterSuperadmin(superAdmin){


    console.log(superAdmin);
    this.SAService.ajouterSuperAdmin(superAdmin)
    //this.router.navigate(['home']);
    setTimeout(()=>{
      this.successAdd="Nouveau superadmin «"+superAdmin.nom+"» enregistrée";
      this.listSuperAdmins=this.SAService.getListSuperAdminEcole();
    },2000);
    setTimeout(()=>{
      this.successAdd=" ";
    },5000);

  }
  viewListSuperAdmins(event){

    this.authService.setIdSelectedEcole(event.target.value);
    this.listSuperAdmins=this.SAService.getListDirecteursEcole();
    this.idEcole=this.authService.getIdSelectedEcole();

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
  estNonVidee(chaine){
    if(chaine == null){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }
  modalSupp(tmpsuperadmin){

    console.log("modal supp  "  , tmpsuperadmin);
    this.tmpsuperadmin=tmpsuperadmin;
  }
  DeleteSuperAdmin(id) {
    this.SAService.deletePersonnel(id).subscribe(res => {
      //console.log(res);
    });
    this.listSuperAdmins =  this.SAService.getListSuperAdminEcole();
  }
}
