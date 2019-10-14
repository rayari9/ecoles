import { Component, OnInit } from '@angular/core';
import {MatiereService} from "../../services/matiere.service";
import{HttpClient} from '@angular/common/http';
import {AuthService} from "../../services/auth.service";
import {Matiere} from "../../models/matieres";
import * as $ from 'jquery';
import 'jspdf-autotable';
declare var jsPDF: any;
@Component({
  selector: 'app-list-matiers',
  templateUrl: './list-matiers.component.html',
  styleUrls: ['./list-matiers.component.css']
})
export class ListMatiersComponent implements OnInit {


  isValid = true;
  id: any = '';
  idE: any = '';
  estOptionnelle: any = '';
  abrege: any = '';
  icone: any = '';
  nomMatiere: any = '';
  matieres : any= {};
  tmpmatiere : any= {};
  empty=[];

  term: any='';
  pathIcone: any='';


  selectedFile: File= null;


  constructor(private http: HttpClient, private matiereService : MatiereService , private authServ: AuthService )
  {
    this.matieres = matiereService.getMatieresEcole();

  }

  onIconeSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/api/upload',fd).subscribe(res =>{
      console.log("res",res);
      // (<HTMLInputElement>document.getElementById("path").value) = res.name;
      this.pathIcone=res;

    })

  }

  deleteMatiere(id) {
    this.matiereService.deleteMatiere(id).subscribe(res => {
    });
 this.matieres = this.matiereService.getMatieresEcole();

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


    /*console.log("list matieres id ",this.id);
    console.log("list matieres idE ",this.idE);*/
  }
  updateMatiere(matiere)
  {
    //console.log(matiere);
    this.matiereService.updateMatiere(matiere);
  this.matieres = this.matiereService.getMatieresEcole();

  }

  estNonVidee(chaine){
    if(chaine == ""){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }
  ngOnInit() {
    // this.matieres = matiereService.getMatieresEcole();


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
  }
  //importation en excel
  exportationExcel(){
    this.matieres = this.matiereService.getMatieresExcel(this.authServ.getNomGroupe());
    console.log(this.matieres);
  }

  //imprimer pdf
  generationPDF() {

    this.http.get<Matiere[]>(this.authServ.getSubDomain()+"/matieres/"+this.authServ.getNomGroupe()).subscribe(matieres =>
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
}
