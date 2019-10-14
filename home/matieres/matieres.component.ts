import {
  Component, ComponentFactoryResolver, NgZone, OnInit, NgModule, ViewChild, ViewContainerRef, Type,ViewEncapsulation
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'


import {MatiereService} from "../../services/matiere.service";
import{HttpClient} from '@angular/common/http';
import {EcoleService} from "../../services/ecole.service";
import {ListMatiersComponent} from "../../components/list-matiers/list-matiers.component";
import {AuthService} from "../../services/auth.service";
import {FormGroup} from "@angular/forms";
import {Matiere} from "../../models/matieres";


import * as $ from 'jquery';
import 'jspdf-autotable';
declare var jsPDF: any;
@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.scss'],
  encapsulation: ViewEncapsulation.None


})


export class MatieresComponent implements OnInit{

  id: any = '';
  idE: any = '';
  pathUpIcone: any = '';
  estOptionnelle: any = '';
  abrege: any = '';
  icone: any = '';
  isValid = true;
  nomMatiere: any = '';
  matieres : any= [];
  listMatieres : any= {};
  tmpmatiere : any= {};
  empty=[];
  pathIcone: any='';
  selectModel:any='';
  successAdd:any='';
  term:any='';

  selectedFile: File= null;
  ecoles:any=[];
  connectedUser:any='';
  dateDeconx: any='';
  myform: FormGroup;
  public data:any=[]
   myobject:any={}
loader:any=true
  //@ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;


// Expose class so that it can be used in the template
  //ListMatiersComponentClass = ListMatiersComponent;
// Keep track of list of generated components for removal purposes
  components = [];

  constructor(private _cfr: ComponentFactoryResolver,private matiereService : MatiereService ,private ecoleService :EcoleService, private http: HttpClient, private zone:NgZone,private authService : AuthService )
  {

    this.matieres = [] ;

    //this.authService.getIdSelectedEcole();
    //this.matieres = matiereService.getMatieresEcole();

    //date dernière connexion
    this.connectedUser=authService.getConnectedUser();
    let dateValue=Date.parse( this.connectedUser['derniereCnx']);
    this.dateDeconx=new Date(dateValue).toLocaleString();
    console.log("date deconx",this.dateDeconx);


  }

  ngOnInit() {

    this.authService.getgroupe().subscribe(res => {
      console.log(res);
      //this.selectModel=null
      this.data=[]
      if(res.id){
      this.loader=true
        this.ecoleService.getEcoles(res.id).subscribe(res=>{
          console.log(res);
          this.loader=false
          this.ecoles = res
        })
      }
      else{
        this.ecoleService.getEcoles(this.authService.getNomGroupe()).subscribe(res=>{
          console.log(res);
          this.ecoles = res
          this.loader=false
        })
      }
    })

  }

  onIconeSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authService.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      // (<HTMLInputElement>document.getElementById("path").value) = res.name;
      this.pathIcone=res;

    })

  }
  uponIconeSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authService.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      // (<HTMLInputElement>document.getElementById("path").value) = res.name;
      this.pathUpIcone=res;

    })

  }

  deleteMatiere(id) {
    this.matiereService.deleteMatiere(id).subscribe(res => {
    });
    this.matieres = this.matiereService.getMatieresEcole().subscribe(res=>{
      console.log(res);
      this.data=res
      this.loader=false
    })
  }

  modalSupp(tmpmatiere){
    this.tmpmatiere=tmpmatiere;
  }

  ModalAfficheMatiere(id,idE,nomMatiere,abrege,estOptionnelle,icone){
    this.id=id;
    this.idE=idE;
    this.nomMatiere=nomMatiere;
    this.abrege=abrege;
    this.estOptionnelle=estOptionnelle;
    this.icone=icone;
  }
  updateMatiere(matiere)
  {
    //console.log(matiere);
    this.matiereService.updateMatiere(matiere);

    setTimeout(()=>{

      this.matieres = this.matiereService.getMatieresEcole().subscribe(res=>{
        console.log(res);
        this.data=res
        this.loader=false
      })

    },2500);


  }

  AddMatiere(matiere){

    console.log("matieres components ",matiere);


     this.matiereService.AddMatiere(matiere)
      //this.viewListMatiers(this.selectModel)

    setTimeout(()=>{
      this.successAdd="Nouvelle matière «"+matiere.nomMatiere+"» enregistrée";
      this.matieres = this.matiereService.getMatieresEcole().subscribe(res=>{
        console.log(res);
        this.data=res
        this.loader=false
      })

    },1500);
    setTimeout(()=>{
      this.successAdd=" ";
    },5000);

  }

  estNonVidee(chaine){
    if(chaine == ""){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }


  viewListMatiers(event){

    console.log("event",event.target.value);
    this.loader=true
    this.authService.setIdSelectedEcole(event.target.value);

    this.idE=this.authService.getIdSelectedEcole();
    console.log("id ecole",this.authService.getIdSelectedEcole());
    this.matieres = this.matiereService.getMatieresEcole().subscribe(res=>{
      console.log(res);
      this.data=res
      this.loader=false
    })
}

  isSelected(id){

    if (id === Number(this.authService.getIdSelectedEcole()))
    {
      return true;
    }
    return false;
  }
  exportationExcel(){
    this.matieres = this.matiereService.getMatieresExcel(this.authService.getNomGroupe());
    console.log(this.matieres);
  }

  //imprimer pdf
  generationPDF() {

    this.http.get<Matiere[]>(this.authService.getSubDomain()+"/matieres/"+this.authService.getNomGroupe()).subscribe(matieres =>
    {
      var columns = [
        {title: "Nom matière ", dataKey: "nomMatiere"},
        {title: "Abrégé", dataKey: "abrege"},
        {title: "Optionnelle", dataKey: "estOptionnelle"},
      ];

      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, matieres, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des Matiéres",128,15);
        }
      });

      doc.autoPrint()
      doc.save('matieres.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','ecoles.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });

  }
  Effacer_Recherche(){
    this.term='';
  }

}

