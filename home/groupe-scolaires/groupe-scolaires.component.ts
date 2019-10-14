import { Component, OnInit, NgZone } from '@angular/core';
import {GroupeScolaireService} from "../../services/groupe-scolaire.service";
import{HttpClient} from '@angular/common/http';
import { NgClass } from '@angular/common';
import * as $ from 'jquery';
declare var jsPDF: any;
import {GroupeScolaires} from "../../models/groupe-scolaires";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Globals} from "../../models/globals";
import 'rxjs/add/operator/map'


@Component({
  selector: 'app-groupe-scolaires',
  templateUrl: './groupe-scolaires.component.html',
  styleUrls: ['./groupe-scolaires.component.css']
})

export class GroupeScolairesComponent implements OnInit {


  user:any='';
  dateDeconx: any='';

  id: any = '';
  nomG:any = '';
  nomBase:any ='';
  domaine:any = '';
  imagePageConx: any = '';
  logoPageConx: any = '';
  couleurExterne: any = '';
  logoBarreTache: any = '';
  couleurBarreTache: any = '';
  creePar: any = '';
  modifiePar: any = '';
  createdAt: any = '';
  updatedAt: any = '';

  groupes:any='';

  tmpgroupe:any=';'
  term: any='';

  base: any='';
  selectedFile: File= null;

  pathImagePageCx: any='';
  upPathImagePageCx: any='';
  pathLogoCx: any ='';
  upPathLogoCx: any ='';
  pathLogoBtache: any='';
  upPathLogoBtache: any='';

  erreurDomain: any='';
  successAdd: any='';
  connectedUser:any='';


  checkboxFlag:boolean = false;
  checkboxFlagm:boolean = false;

  disabledbutton: any='';

  selectedcolorBarretache: any='';
  upSelectedcolorBarretache: any='';
  selectedcolorExtern: any='';
  upSelectedcolorExtern: any='';


  color:any='';
  upcolor:any='';
  pathImagePageCxx:any='';

  public data:any=[];
  myobject:any={};
  /////////////////////////////constructeur/////////////////////////////////////////////////////////////////

  constructor(private authServ: AuthService,private router:Router,private zone:NgZone, private gpe:GroupeScolaireService,private http: HttpClient,private globals: Globals) {

    //this.groupes = gpe.getGroupeScolaires();
    this.groupes = gpe.getGroupeScolaires().subscribe(res=>{

      this.data=res

    })


    ///////date deconnexion///////
    this.connectedUser=authServ.getConnectedUser();
    let dateValue=Date.parse( this.connectedUser['derniereCnx']);
    this.dateDeconx=new Date(dateValue).toLocaleString();

  }



/////////////////////////////////////////////////////////////////////////////////////////
  Effacer_Recherche(){
    this.term='';
  }

//////////////////////////////////////////////color picker//////////////////////////////////////////////////////////////////////
  onchangeColorExtern(e){

    this.selectedcolorExtern=e;
  }
  onchangeColorBarreTache(e){

    this.selectedcolorBarretache=e;
  }
  upOnchangeColorExtern(e){

    this.upSelectedcolorExtern=e;
  }
  upOnchangeColorBarreTache(e){

    this.upSelectedcolorBarretache=e;
  }

///////////////////////////////////validate/////////////////////////////////////////////////////////////////////////////////////////

  validSubdomain(domain) {
    var re = /[^a-zA-Z0-9\-]/;
    var val = domain
    if(re.test(val)) {
      return false;
    }
    else {
      return true;
    }
  }
/////////////////////////////////////generation du nom de base de donnée//////////////////////////////////////////////////////////////////////////////
  onKeyDomain(event){
    this.base=event.target.value.concat(new Date().getTime());
  }



  ////////////////////////////////////////////////////////////////uploads/////////////////////////////////////////////////////////////////////
/////////////////////////////////////upload image page connexion

  onFileSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd = new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).map((res:Response) => res).subscribe(res =>{


      this.pathImagePageCx=res;


    });

  }

  Effacer_Image_Page_Conx(){
    console.log("effacer");
    this.pathImagePageCx='';
  }

  upOnFileSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd = new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{


      this.upPathImagePageCx=res;


    })

  }
/////////////////////////////////////////upload logo barre de tache

  onLogoBtacheSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).map((res:Response) => res).subscribe(res =>{


      this.pathLogoBtache=res;


    })

  }

  upOnLogoBtacheSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).map((res:Response) => res).subscribe(res =>{

      console.log("res",res);
      this.upPathLogoBtache=res;


    })

  }

//////////////////////////////////////////upload logo page connexion

  onLogoPageConxSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);

    this.http.post(this.authServ.getSubDomain()+"/upload",fd).map((res:Response) => res).subscribe(res =>{//appeler service d'upload l'image et retourner le nom comme resultat

      this.pathLogoCx=res;

    })

  }

  upOnLogoPageConxSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);

    this.http.post(this.authServ.getSubDomain()+"/upload",fd).map((res:Response) => res).subscribe(res =>{//appeler service d'upload l'image et retourner le nom comme resultat

      this.upPathLogoCx=res;

    })

  }

/////////////////////////////////////////////////////////////////////////ajouter  groupe///////////////////////////////////////////////////////////////////////////////////


  AddGroupe(groupe){


    var domaine=groupe.domaine;


// tester la validité du domain
    if(this.validSubdomain(domaine)) {// si domaine valide

      this.gpe.AddGroupeScolaire(groupe);// appel au service rest pour ajouter groupe

      this.successAdd="Nouveau groupe «"+groupe.nomG+"» enregistré";
      setTimeout(()=>{
        this.successAdd=" ";
      },3000);

      setTimeout(()=>{
        this.groupes = this.gpe.getGroupeScolaires().subscribe(res=>{

          this.data=res

        })

      },3000);

    }else{
      this.erreurDomain="nom de domain invalide";// afficher message erreur

    }

  }
/////////////////////////////////////////////////////edit groupe//////////////////////////////////////////////////////////////////
  editGroupe(groupe){

    this.gpe.editGroupeScolaire(groupe);
    setTimeout(()=>{
      this.groupes = this.gpe.getGroupeScolaires().subscribe(res=>{

        this.data=res

      })

    },3000);

  }


//////////////////////////////////////////////////////////affichage ///////////////////////////////////////////////////////////////////////////
  modalEdit(id,base,nomG,domaine,couleurBarreTache, logoBarreTache,couleurExterne,logoPageConx,imagePageConx,defaultPersonalisation){

    this.id=id;
    this.nomG=nomG;
    this.domaine=domaine;
    this.nomBase=base;
    this.upSelectedcolorBarretache=couleurBarreTache;
    this.upSelectedcolorExtern=couleurExterne;

    this.upPathImagePageCx=imagePageConx;
    this.upPathLogoCx= logoPageConx;
    this.upPathLogoBtache=logoBarreTache;

    this.checkboxFlagm=defaultPersonalisation;

    if(this.checkboxFlagm){//si on choisir la personalisation par défaut alors on desactive les champs des uploads d'images
      this.disabledbutton = 'disabledbutton'; //afectation de classe disabledbutton aux champs d'uploads
    }else{
      this.disabledbutton = '';
    }
  }


  modalSupp(tmpgroupe){
    this.tmpgroupe=tmpgroupe;
  }
////////////////////////supprimer un groupe scolaire//////////////////////////////////////////////////////////////////////////////////////

  deleteGroupe(id,base){
    this.gpe.deleteGroupeScolaire(id,base);
    setTimeout(()=>{
      this.groupes = this.gpe.getGroupeScolaires().subscribe(res=>{

        this.data=res

      })

    },3000);
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  estNonVide(chaine){
    if(chaine == ""){

      return false;
    }else{return true;}
  }

  /*///////////////////////////////////export excell////////////////////////////////////////////////*/

  generatePDF() {

    this.http.get<GroupeScolaires[]>(this.authServ.getSubDomain()+"/groupeScolaires").subscribe(groupes =>
    {
      var columns = [
        {title: "Nom", dataKey: "nomG"},
        {title: "Domaine", dataKey: "domaine"}
      ];

      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, groupes, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des Groupes Scolaires",128,15);
        }
      });

      doc.autoPrint()
      doc.save('groupes.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','groupes.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });



  }
  /********exportation excel*////////////////////////////////////////
  exportation(){

    this.groupes = this.gpe.getGroupesExcel();

  }

  /************************personalisation par defaut*******************************/
  UploadDisable(){

    this.checkboxFlag = !this.checkboxFlag;
    this.checkboxFlagm = !this.checkboxFlagm;

    if(this.checkboxFlag){//si on choisir la personalisation par défaut alors on desactive les champs des uploads d'images
      this.disabledbutton = 'disabledbutton'; //afectation de classe disabledbutton aux champs d'uploads
    }else{
      this.disabledbutton = '';
    }
    if(this.checkboxFlagm){//si on choisir la personalisation par défaut alors on desactive les champs des uploads d'images
      this.disabledbutton = 'disabledbutton'; //afectation de classe disabledbutton aux champs d'uploads
    }else{
      this.disabledbutton = '';
    }

  }

///////////////////////////////////

  ngOnInit() {

    const $ = window["$"];
    $(function () {
      $('[data-toggle="tooltip"]').tooltip({

        animated: 'fade',
        placement: 'right',
        html: true,

      });
    });


    $(function(){
      $('#buttonAdd').click(function(){
        $(":input","#g")
          .not(':button, :submit, :reset, :hidden ')
          .val('')
          .removeAttr('checked')

        $( ":span","#g").val( '' );
      });
    });


  }






}
