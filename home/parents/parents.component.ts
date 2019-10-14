import { Component, OnInit } from '@angular/core';
import {ParentService} from "../../services/parent.service";
import{HttpClient} from '@angular/common/http';
import {EleveService} from "../../services/eleve.service";
import {Parent} from "../../models/parent";
import {AuthService} from "../../services/auth.service";


import 'jspdf-autotable';
import {EcoleService} from "../../services/ecole.service";
declare var jsPDF: any;
@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {

  id: any = '';
  nomP: any = '';
  prenomP: any = '';
  adressePostaleP: any = '';
  signiatureP: any = '';
  presentationP: any = '';
  penseBeteP: any = '';
  civiliteP: any = '';
  creePar: any = '';
  modifiePar: any = '';
  createdAt: any = '';
  updatedAt: any = '';
  idCU: any = '';
  tel1: any = '';
  tel2: any = '';
  emailP: any = '';
  prof: any = '';
  complementAdresse: any = '';
  ville: any = '';
  codePostale: any = '';
  lienPrente: any = '';
  login: any = '';
  password: any = '';
  nomE: any = '';
  termP: any = '';
  tmpparent : any= {};
  tmpeleveParent : any= {};
  hide = true;
  pathAvatar: any='';
  avatar: any='';
  parents: any = {};
  ListParent: any = {};
  ecoles: any = {};
  listParentEleve: any = {};
  selectedFile: File= null;
  nbre_parents : any= '';
  avatarr: any = '';
  term: any = '';
  longeur: any = '';

  selectModel:any='';


  connectedUser:any='';
  dateDeconx: any='';


  public data:any=[]
  myobject:any={}
  loader:any=true
  constructor(private parentService: ParentService , private authServ: AuthService, private http: HttpClient , private eleveService :EleveService ,private ecoleService: EcoleService   )
  {


    this.ListParent = [];
    this.listParentEleve = parentService.getParentEleve(this.id);
    this.ecoles = ecoleService.getEcoles(authServ.getNomGroupe());

    this.fonctionLength();
    console.log("longueuuur" ,this.fonctionLength());
    this.authServ.getIdSelectedEcole();

    //date dernière connexion
    this.connectedUser=authServ.getConnectedUser();
    let dateValue=Date.parse( this.connectedUser['derniereCnx']);
    this.dateDeconx=new Date(dateValue).toLocaleString();
    console.log("date deconx",this.dateDeconx);
  }
  //fonction pour conter le nbre des parants
  fonctionLength(){
    this.http.get<Parent[]>(this.authServ.getSubDomain()+"/parentsEcole/"+ this.authServ.getNomGroupe()).subscribe(parents =>{
      return parents.length;


    });
  }
    ngOnInit()
    {
      this.authServ.getgroupe().subscribe(res => {
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
          this.ecoleService.getEcoles(this.authServ.getNomGroupe()).subscribe(res=>{
            console.log(res);
            this.ecoles = res
            this.loader=false
          })
        }
      })


      const $ = window["$"];
      $(function () {

        $('[data-toggle="tooltip"]').tooltip();
      });

    }

    deleteParent(id)
    {
      this.parentService.deleteParent(id).subscribe(res => {
        //console.log(res);
      });

      this.ListParent = this.parentService.getListParentsEcole().subscribe(res=>{
        console.log(res);
        this.data=res
        this.loader=false
      })
    }

  modalSupp(tmpparent){
    this.tmpparent=tmpparent;
  }

  modalSupprimeEleve(tmpeleveParent){
    this.tmpeleveParent=tmpeleveParent;
  }

  ModalAfficheParent(id,nomP,prenomP,tel1,tel2,emailP,adressePostaleP,lienPrente)
  {
    this.id=id;
    console.log(id);
    this.nomP=nomP;
    this.prenomP=prenomP;
    this.tel1=tel1;
    this.tel2=tel2;
    this.emailP=emailP;
    this.adressePostaleP=adressePostaleP ;
    this.lienPrente=lienPrente;
    this.listParentEleve = this.parentService.getParentEleve(id);
  }
  updateParent(parent)
  {
    console.log(parent);

    this.parentService.updateParent(parent);

     setTimeout(()=>{

      this.ListParent = this.parentService.getListParentsEcole().subscribe(res=>{
        console.log(res);
        this.data=res
        this.loader=false
      })

    },2500);

  }

  estNonVidee(chaine){
    if(chaine == ""){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }
  onAvatarSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/api/upload',fd).subscribe(res =>{
      console.log("res",res);
      // (<HTMLInputElement>document.getElementById("path").value) = res.name;
      this.pathAvatar=res;

    })

  }
 deleteParentEleve(id) {
    this.eleveService.deleteEleve(id).subscribe(res => {
    });
    this.listParentEleve = this.parentService.getParentEleve(id);
    console.log(this.listParentEleve);
  }

  //importation en excel
  exportationExcel(){
    this.ListParent = this.parentService.getParentsExcel(this.authServ.getNomGroupe());
    console.log(this.ListParent);
  }

  //imprimer pdf
  generationPDF() {

    this.http.get<Parent[]>(this.authServ.getSubDomain()+"/parents/"+this.authServ.getNomGroupe()).subscribe(parents =>
    {
      var columns = [
        {title: "Nom Parent ", dataKey: "nomP"},
        {title: "Prénom Parent", dataKey: "prenomP"},
        {title: "Adresse Postale", dataKey: "adressePostaleP"},
        {title: "Numéro Télèphone", dataKey: "tel1"},
        {title: "Email", dataKey: "emailP"},
      ];

      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, parents, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des Parents",128,15);
        }
      });

      doc.autoPrint()
      doc.save('parents.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','ecoles.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });

  }

  viewListParents(event){
    console.log("event",event.target.value);
    this.loader=true
    this.authServ.setIdSelectedEcole(event.target.value);
    this.ListParent = this.parentService.getListParentsEcole().subscribe(res=>{
      console.log(res);
      this.data=res
      this.loader=false
    })


  }
  Effacer_Recherche(){
    this.term='';
  }
  isSelected(id){

    if (id === Number(this.authServ.getIdSelectedEcole())){
      return true;

    }
    return false;
  }



   length()
   {

     this.longeur= this.fonctionLength();
     console.log("aaaaaaaaaaa",this.longeur);
   }

}
