import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {ClasseService} from "../../services/classe.service";
import {MatiereService} from "../../services/matiere.service";
import {RequestOptions} from "@angular/http";
import {EcoleService} from "../../services/ecole.service";
import {AuthService} from "../../services/auth.service";
import{HttpClient} from '@angular/common/http';
import {Matiere} from "../../models/matieres";
import {DecoupageService} from "../../services/decoupage.service";
import {Classe} from "../../models/classes";
import {Enseignant} from "../../models/enseignants";
declare var jsPDF: any;


@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClassesComponent implements OnInit {

  id: any = '';
  abrege: any = '';
  nomC: any = '';
  idDecoupage: any = '';
  libele: any = '';
  formatNotation: any = '';
  idE: any = '';
  createdAt: any = '';
  updatedAt: any = '';
  creePar: any = '';
  modifiePar: any = '';
  tmpclasse : any= {};
  decoupages: any = '';
  ecoles :any=[];
  classes :any=[];
  listClasses:any=[];
  enseignants:any=[];
  matieres:any=[];
  hide = true;
  data:any=[]
  divparent={};
  connectedUser:any='';
  dateDeconx: any='';
  selectModel:any=null
  constructor(private ecoleService :EcoleService,private classeService: ClasseService, private matiereService: MatiereService,private authService : AuthService, private http: HttpClient ) {
    console.log("getClasses service");

    classeService.getEnseignants().subscribe(res=>{
      console.log(res);

      this.enseignants = res
    })
    matiereService.getAllMatieres().subscribe(res=>{
      console.log(res);
      this.matieres = res
    })

    classeService.getDecoupages().subscribe(res=>{
      console.log(res);
      this.decoupages = res
    })

      //date dernière connexion
      this.connectedUser=authService.getConnectedUser();
      let dateValue=Date.parse( this.connectedUser['derniereCnx']);
      this.dateDeconx=new Date(dateValue).toLocaleString();
      console.log("date deconx",this.dateDeconx);
  }
  viewListCours(selectModel){
    this.authService.setIdSelectedEcole(selectModel);
    this.classeService.getClassesbyidEcole(selectModel).subscribe(res=>{
      console.log(res);
     this.data =res
   })
  }


  AddClasse(classe){

   // console.log(classe);

    this.classeService.AddClasse(classe);

    this.classes = this.classeService.getClasses();


  }


  modalSupp(tmpclasse){
    this.tmpclasse=tmpclasse;
  }

  deleteClasse(id) {

    console.log(id);
    this.classeService.deleteClasse(id).subscribe(res => {
    });
    this.classes = this.classeService.getClasses();

  }



  updateClasse(classe)
  {
    console.log("update class");
    console.log(classe);

    this.classeService.updateClasse(classe);
    this.classes = this.classeService.getClasses();

  }

  ModalAfficheClasse(id,nomC,abrege,formatNotation){
    //this.classes=classes;
    this.id=id;
    console.log(id);
    this.nomC=nomC;
    this.abrege=abrege;
    this.formatNotation=formatNotation;
  }

  // function pour ajouter les inputs text dynamiquement
   myFunction() {


   /*var x = document.createElement("DIV");
   x.setAttribute("type", "text");
  x.setAttribute("id" );
  x.setAttribute("class", "row");
  x.setAttribute("style", "margin-bottom:10px");

  document.getElementById("Cible").appendChild(x);*/

  /* var x = document.createElement("SELECT");
   x.setAttribute("type", "int");
   x.setAttribute("id","idMatiere" );
   x.setAttribute("class", "form-control label_model");
   x.setAttribute("style", "margin-bottom:10px");
     x="<div class='col-md-6'>"+x+"</div>"*/
     return this.http.get<Matiere[]>("http://localhost:3000/api/matieres/"+this.authService.getNomGroupe()).subscribe(matieres => {

       var x1='<div class="ligne-matiere col-sm-12" style="margin-left: -30px" > <div class="col-md-3" style="margin-bottom: 10px "><select  id="idMatiere" class="form-control col-md-6 label_model" >';

        x1+='<option>'+'Sélectionner une matière'+'</option>';
       for (let matiere of matieres) {
         console.log("mat", matiere);

      x1+='<option>'+matiere.nomMatiere+'</option>';

       }
       x1+='</select></div>';

       return this.http.get<Enseignant[]>("http://localhost:3000/api/enseignants/"+this.authService.getNomGroupe()).subscribe(enseignants => {

     var y1='<div class="col-md-3"><select  id="idEnseignant"  class="form-control col-md-6 label_model" >';
         y1+='<option>'+' Enseignant'+'</option>';
       for (let enseignant of enseignants) {
         console.log("ensei", enseignant);
         y1 += '<option>' + enseignant.prenom + '</option>';
       }
       y1+='</select></div>';



       return this.http.get<Enseignant[]>("http://localhost:3000/api/enseignants/"+this.authService.getNomGroupe()).subscribe(enseignants => {

         var z1='<div class="col-md-3"><select  id="idEnseignant" class="form-control col-md-6 label_model">';

         z1+='<option>'+'Co-enseignant'+'</option>';
         for (let enseignant of enseignants) {
           console.log("co-ensei", enseignant);
           z1 += '<option>' + enseignant.prenom + '</option>';
         }
       z1+='</select></div>';

         var w1='<div class="col-md-2"><input type="int" id="coef" class="form-control col-md-6 label_model"/> </div>';

         var t1='<div class="col-md-1"><i ><img src="../../../assets/images/supp.png" height="32" width="24"/ ></i></div></div>';


           $("#Cible").append(x1+y1+z1+w1+t1);

     });
     });

     });


    /* var x = document.createElement("INPUT");
     x.setAttribute("type", "text");
     x.setAttribute("id","coef" );
     x.setAttribute("class", "form-control label_model");
     x.setAttribute("style", "margin-bottom:10px");

     document.getElementById("Cible").appendChild(x);*/

 /* var x = document.createElement("IMG");
  //x.setAttribute("src", "../../../assets/images/supp.png");
  x.setAttribute("class", "col-md-1");
  x.setAttribute("style", "width: 23.666667%;");
  document.getElementById("Cible").appendChild(x);

  var x = document.createElement("BR");
  document.getElementById("Cible").appendChild(x);*/

  }

  exportation(){

    this.classes = this.classeService.getClassesExcel(this.authService.getNomGroupe());
    console.log("classes",this.classes);

  }
  generatePDF() {
    return this.http.get<Classe[]>("http://localhost:3000/api/classes/"+this.authService.getNomGroupe()).subscribe(classes =>
    {
      console.log("claaaaaaase",classes);
      var columns = [
        {title: "Nom", dataKey: "nomC"},
        {title: "Abrégé", dataKey: "abrege"},
        {title: "Decoupage", dataKey: "libele"},
        {title: "Format Notation", dataKey: "formatNotation"},

      ];

      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns,classes, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des Classes",128,15);
        }
      });

      doc.autoPrint()
      doc.save('classes.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','classes.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });




  }


  ngOnInit() {
    this.authService.getgroupe().subscribe(res => {
      console.log(res);
      this.selectModel=null
      this.data=[]
      if(res.id){
        this.ecoleService.getEcoles(res.id).subscribe(res2=>{
          console.log(res2);
          this.ecoles = res2
        })
      }else{
        this.ecoleService.getEcoles(this.authService.getNomGroupe()).subscribe(res2=>{
          console.log(res2);
          this.ecoles = res2
        })
      }
    })
  }
}
