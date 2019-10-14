import {Component, ComponentFactoryResolver, NgModule, OnInit, ViewChild, ViewContainerRef, AfterViewInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {EcoleService} from "../../services/ecole.service";
import {AuthService} from "../../services/auth.service";
import 'jspdf-autotable';
import{HttpClient} from '@angular/common/http';
import {Ecoles} from "../../models/ecoles";
import * as $ from 'jquery';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Globals} from "../../models/globals";
import {GroupeScolaires} from "../../models/groupe-scolaires";

declare var jsPDF: any;
@Component({
  selector: 'app-ecoles',
  templateUrl: './ecoles.component.html',
  styleUrls: ['./ecoles.component.css']
})



export class EcolesComponent implements OnInit,AfterViewInit{
  rows:any='';

  pathupImageSigniature: any='';
  pathupPhotoEtablissement: any='';
  pathupLogoBtache: any='';
  pathupLogoCx: any='';
  pathupImagePageCx: any='';

  id: any = '';
  lundi: any = '';
  nomE: any = '';
  adressePostale: any = '';
  pays: any = '';
  codePostal: any = '';
  ville: any = '';
  tel1: any = '';
  tel2: any = '';
  email1: any = '';
  email2: any = '';
  siteWeb: any = '';
  chefEtablissement: any = '';
  dateDeconx: any='';
  presentation: any = '';
  titrePresentation: any = '';
  creePar: any = '';
  modifiePar: any = '';
  createdAt: any = '';
  updatedAt: any = '';
  nomGrp: any = '';
  ecoles: any = '';
  listEcole: any = '';
  term: any='';
  groupeScolaire:any='';
  nomGroupe:any='';
  tmpecole:any='';
  pathImagePageCx: any='';
  pathLogoCx: any ='';
  pathLogoBtache: any='';
  pathImageSigniature: any='';
  pathPhotoEtablissement:any='';
  photoEtablissement: any = '';
  imgPageCnx: any = '';
  logoPageCnx: any = '';
  couleurExterne: any = '';
  logoBarreTache: any = '';
  couleurBarreTache: any = '';
  successAdd: any = '';
  selectedFile: File= null;
  color: any='';
  imgSigniature: any='';
  libelleD='';
  horaires: any='';
  nomSemestre: any='Semestre';
  nomBimestre: any='Bimestre';
  nomTrimestre: any='Trimestre';
  disabledbutton: any='';
  dateAuT2: any='';
  dateDuT3: any='';
  dateAuT3: any='';
  idH: any='';
  lundi1: any='';
  lundi2: any='';
  lundi3: any='';
  lundi4: any='';
  mardi1: any='';
  mardi2: any='';
  mardi3: any='';
  mardi4: any='';
  mercredi1: any='';
  mercredi2: any='';
  mercredi3: any='';
  mercredi4: any='';
  jeudi1: any='';
  jeudi2: any='';
  jeudi3: any='';
  jeudi4: any='';
  vendredi1: any='';
  vendredi2: any='';
  vendredi3: any='';
  vendredi4: any='';
  samedi1: any='';
  samedi2: any='';
  samedi3: any='';
  samedi4: any='';
  dimanche1: any='';
  dimanche2: any='';
  dimanche3: any='';
  dimanche4: any='';
  fermeLundi: any='';
  fermeMardi: any='';
  fermeMercredi: any='';
  fermeJeudi: any='';
  fermeVendredi: any='';
  fermeSamedi: any='';
  fermeDimanche: any='';
  calendrierS: any='';
  eDTClasses: any='';
  eDTProf: any='';
  docPublie: any='';
  docRecu: any='';
  galerie: any='';
  docP: any='';
  bilanAbs: any='';
  carnet: any='';
  bullEleves: any='';
  bullClasses: any='';
  libelleAS: any='';
  dateDebut: any='';
  dateFin: any='';
  data:any=[];
  checkboxFlag:boolean = true;
  idAS: any='';
  groupe:any='';
  nomG:any='';
  selectedcolorBarretache: any='';
  upSelectedcolorBarretache: any='';
  selectedcolorExtern: any='';
  upSelectedcolorExtern: any='';
  color1:any='';
  upcolor1:any='';
  upcolor:any='';
  public invoiceForm: FormGroup;
  public invoiceFormModif: FormGroup;
  connectedUser:any='';

  @ViewChild('form')
  private form: FormGroup;
  @ViewChild('myDecoup', { read: ViewContainerRef }) container: ViewContainerRef;
  constructor(private _b: FormBuilder,private globals: Globals ,private _cfr: ComponentFactoryResolver,private eco: EcoleService, private authServ: AuthService, private http: HttpClient ,private _fb: FormBuilder) {
    this.groupeScolaire = authServ.getNomGroupe();
    this.connectedUser=authServ.getConnectedUser();
    console.log("grouuuuuuuuupe"+authServ.getNomGroupe());
    //this.groupe=eco.getBase(authServ.getNomGroupe());
    let dateValue=Date.parse( this.connectedUser['derniereCnx']);
    this.dateDeconx=new Date(dateValue).toLocaleString();
    console.log("date deconx",this.connectedUser['derniereCnx']);
    console.log("baaaaaaaaaase",this.groupe.nomG);


    this.http.get<GroupeScolaires[]>(this.authServ.getSubDomain()+"/ecoles_groupe/"+authServ.getNomGroupe()).subscribe(res =>{
      console.log("result Groupe",res);
      this.groupe=res;
      console.log("baaaaaaaaaase",this.groupe.nomG);
      this.nomGrp=this.groupe.nomG
    })

  }

//////////////////////////////////////////////color picker//////////////////////////////////////////////////////////////////////
  ecoleOnchangeColorExtern(e){

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





  ajouterDecoupage(){
    $("#idPersonnalise").addClass("mydivNo");
    $("#idTrimestre").addClass("mydivNo");
    $("#idSemestre").addClass("mydivNo");
    $("#idBimestre").addClass("mydivNo");
  }
  ajouterDecoupModif(){
    $("#up_P").addClass("mydivNo");
    $("#up_T").addClass("mydivNo");
    $("#up_S").addClass("mydivNo");
    $("#up_B").addClass("mydivNo");
  }


  /////////////////////////////////////////////////////Exportation Excel/////////////////////////////////////////////////
  exportationEcoleExcel(){
    this.listEcole = this.eco.getEcolesExcel(this.authServ.getNomGroupe());
//  console.log(this.listEcole);
  }


  /////////////////////////////////////////////////////Upload Image/////////////////////////////////////////////////
//upload image page connexion
  onFileSelected(event){
    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      this.pathImagePageCx=res;
    })
  }

  //upload image page connexion update
  onupFileSelected(event){
    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      this.pathupImagePageCx=res;
    })
  }

  //upload image Signiature
  onSigniatureSelected(event){
    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      this.pathImageSigniature=res;


    })
  }

  //upload image Signiature update
  onImgSign(event){

    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      // (<HTMLInputElement>document.getElementById("path").value) = res.name;
      this. pathupImageSigniature=res;
    })
  }


/////////upload logo barre de tache
  onLogoBtacheSelected(event){

    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      // (<HTMLInputElement>document.getElementById("path").value) = res.name;
      this. pathLogoBtache=res;
    })
  }

  /////////upload logo barre de tache update
  upBT(event){
    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{//appeler service d'upload l'image et retourner le nom comme resultat
      console.log("res",res);
      this.pathupLogoBtache=res;
    })
  }


////////upload logo page connexion
  onLogoPageConxSelected(event){
    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{//appeler service d'upload l'image et retourner le nom comme resultat
      console.log("res",res);
      this.pathLogoCx=res;
    })
  }

  ////////upload logo page connexion update
  onupLogoPageConxSelected(event){
    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{//appeler service d'upload l'image et retourner le nom comme resultat
      console.log("res",res);
      this.pathupLogoCx=res;
    })
  }

  ///////upload photo Etablissement
  onPhotoEtablissementSelected(event){
    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{//appeler service d'upload l'image et retourner le nom comme resultat
      console.log("res",res);
      this.pathPhotoEtablissement=res;
    })
  }

  ///////upload photo Etablissement update
  onupPhotoEtablissementSelected(event){
    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{//appeler service d'upload l'image et retourner le nom comme resultat
      console.log("res",res);
      this.pathupPhotoEtablissement=res;
    })
  }

  //////////////////////////////////////////////////////color picker//////////////////////////////////////////////////////////////
  onchangeColor(event)
  {
    this.color=event.target.value;
    $("#color").css("background-color", this.color);
  }

  /////////////////////////////////////////////////Supprimer Ecole Modal////////////////////////////////////////////////////////
  modalSupp(tmpecole){
    this.tmpecole=tmpecole;
  }

  ////////////////////////////////////////////////////Supprimer Ecole////////////////////////////////////////////////////////////
  DeleteEcole(id) {
    this.eco.DeleteEcole(id).subscribe(res => {
      //console.log(res);
    });
    this.listEcole = this.eco.getEcoles(this.authServ.getNomGroupe());
  }

  /////////////////////////////////////////////////////////Ajouter  Ecole////////////////////////////////////////////////////////
  AddEcole(ecole){

    this.eco.AddEcole(ecole);
    //this.router.navigate(['home']);
    setTimeout(()=>{
      this.successAdd="Nouvelle école «"+ecole.nomE+"» enregistrée";
      this.listEcole = this.eco.getEcoles(this.authServ.getNomGroupe());

    },1000);
    setTimeout(()=>{
      this.successAdd=" ";
    },4000);

  }



  /////////////////////////////////////////////////////////Remplir les champs////////////////////////////////////////////////////////
  edit1(id,nomE,groupeScolaire,adressePostale,ville,codePostal,pays,tel1,tel2,email1,email2,siteWeb,chefEtablissement,
        presentation,titrePresentation,couleurBarreTache,couleurExterne,photoEtablissement,
        imgPageCnx,logoPageCnx,logoBarreTache,imgSigniature,idH,lundi1,lundi2,lundi3,lundi4,mardi1,mardi2,mardi3,mardi4,
        mercredi1,mercredi2,mercredi3,mercredi4,jeudi1,jeudi2,jeudi3,jeudi4,vendredi1,vendredi2,vendredi3,vendredi4,samedi1,samedi2,samedi3,samedi4,dimanche1,dimanche2,dimanche3,dimanche4,fermeLundi,
        fermeMardi,fermeMercredi,fermeJeudi,fermeVendredi,fermeSamedi,fermeDimanche,idAS,libelleAS,dateDebut,dateFin,calendrierS,eDTClasses,eDTProf, docPublie,docRecu,galerie,docP,bilanAbs,carnet,bullEleves,bullClasses) {
    console.log(this.listEcole);
    this.id=id;
    this.nomE=nomE;
    this.groupeScolaire=groupeScolaire;
    this.adressePostale=adressePostale;
    this.ville=ville;
    this.codePostal=codePostal;
    this.pays =pays;
    this.tel1 =tel1;this.tel2=tel2;
    this.email1 =email1;this.email2 =email2;
    this.siteWeb = siteWeb;
    this.chefEtablissement= chefEtablissement;
    this.presentation =presentation;
    this.titrePresentation =titrePresentation;
    this.upSelectedcolorBarretache=couleurBarreTache;
    this.upSelectedcolorExtern=couleurExterne;
    this.pathupPhotoEtablissement=photoEtablissement;
    this.pathupImagePageCx=imgPageCnx;
    this.pathupLogoCx=logoPageCnx;
    this.pathupLogoBtache=logoBarreTache;
    this.pathupImageSigniature=imgSigniature;
    this.idH=idH;
    this.lundi1=lundi1;this.lundi2=lundi2;this.lundi3=lundi3;this.lundi4=lundi4;
    this.mardi1=mardi1;this.mardi2=mardi2;this.mardi3=mardi3;this.mardi4=mardi4;
    this.mercredi1=mercredi1;this.mercredi2=mercredi2;this.mercredi3=mercredi3;this.mercredi4=mercredi4;
    this.jeudi1=jeudi1;this.jeudi2=jeudi2;this.jeudi3=jeudi3;this.jeudi4=jeudi4;
    this.vendredi1=vendredi1;this.vendredi2=vendredi2;this.vendredi3=vendredi3;this.vendredi4=vendredi4;
    this.samedi1=samedi1;this.samedi2=samedi2;this.samedi3=samedi3;this.samedi4=samedi4;
    this.dimanche1=dimanche1;this.dimanche2=dimanche2;this.dimanche3=dimanche3;this.dimanche4=dimanche4;
    this.fermeLundi=fermeLundi;this.fermeMardi=fermeMardi;this.fermeMercredi=fermeMercredi;this.fermeJeudi=fermeJeudi;this.fermeVendredi=fermeVendredi;this.fermeSamedi=fermeSamedi;this.fermeDimanche=fermeDimanche;
    this.idAS=idAS;this.libelleAS=libelleAS;this.dateDebut=dateDebut;this.dateFin=dateFin;
    this.calendrierS=calendrierS;this.eDTClasses= eDTClasses;this.eDTProf= eDTProf;this.docPublie=docPublie;this.docRecu= docRecu;this.galerie= galerie;this.docP= docP;this.bilanAbs=bilanAbs;this.carnet=carnet;this.bullEleves= bullEleves;this.bullClasses= bullClasses;
  }




  /////////////////////////////////////////////////////////Modifier Ecole////////////////////////////////////////////////////////
  updateEcole(ecole){
    // console.log("edit ecole");
    // console.log(ecole.id);
    this.eco.editEcole(ecole);
    this.listEcole = this.eco.getEcoles(this.authServ.getNomGroupe());

  }

  estNonVidee(chaine){
    if(chaine == ""){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }

  Effacer_Recherche(){
    this.term='';
  }

  generationEcolePDF() {
    this.http.get<Ecoles[]>(this.authServ.getSubDomain()+"/ecoles_Groupe_Scolaire/"+this.authServ.getNomGroupe()).subscribe(ecoles =>
    {
      var columns = [
        {title: "Nom", dataKey: "nomE"},
        {title: "Adresse postale", dataKey: "adressePostale"},
        {title: "Groupe scolaire", dataKey: "groupeScolaire"},
        {title: "Pays", dataKey: "pays"},
        {title: "Tel1", dataKey: "tel1"},
        {title: "Tel2", dataKey: "tel2"},
        {title: "Email1", dataKey: "email1"},
        {title: "Email2", dataKey: "email2"},
        {title: "Site web", dataKey: "siteWeb"},
        {title: "Chef établissement", dataKey: "chefEtablissement"}
      ];

      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, ecoles, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des Ecoles",128,15);
        }
      });

      doc.autoPrint()
      doc.save('ecoles.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','ecoles.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });

  }


  decoupe(decoup) {
    console.log(decoup);
    if (decoup == "Bimestre") {

      $("#idPersonnalise").addClass("mydivNo");
      $("#idTrimestre").addClass("mydivNo");
      $("#idSemestre").addClass("mydivNo");
      $("#idBimestre").removeClass("mydivNo");
    }
    else if(decoup == "Semestre"){
      $("#idPersonnalise").addClass("mydivNo");
      $("#idTrimestre").addClass("mydivNo");
      $("#idBimestre").addClass("mydivNo");
      $("#idSemestre").removeClass("mydivNo");
    }
    else if(decoup == "Trimestre"){
      $("#idPersonnalise").addClass("mydivNo");
      $("#idBimestre").addClass("mydivNo");
      $("#idSemestre").addClass("mydivNo");
      $("#idTrimestre").removeClass("mydivNo");
    }
    else if(decoup == "Personnalise"){

      $("#idTrimestre").addClass("mydivNo");
      $("#idBimestre").addClass("mydivNo");
      $("#idSemestre").addClass("mydivNo");
      $("#idPersonnalise").removeClass("mydivNo");
    }

  }



  Modif_decoupe(mydecoup) {
    console.log(mydecoup);
    if (mydecoup == "Bimestre") {

      $("#up_P").addClass("mydivNo");
      $("#up_T").addClass("mydivNo");
      $("#up_S").addClass("mydivNo");
      $("#up_B").removeClass("mydivNo");
    }
    else if(mydecoup == "Semestre"){
      $("#up_P").addClass("mydivNo");
      $("#up_T").addClass("mydivNo");
      $("#up_B").addClass("mydivNo");
      $("#up_S").removeClass("mydivNo");
    }
    else if(mydecoup == "Trimestre"){
      $("#up_P").addClass("mydivNo");
      $("#up_B").addClass("mydivNo");
      $("#up_S").addClass("mydivNo");
      $("#up_T").removeClass("mydivNo");
    }
    else if(mydecoup == "Personnalise"){

      $("#up_T").addClass("mydivNo");
      $("#up_B").addClass("mydivNo");
      $("#up_S").addClass("mydivNo");
      $("#up_P").removeClass("mydivNo");
    }

  }


  afficheee(){
    console.log("yeeeeeeeees");
  }

  initItemRows() {
    return this._fb.group({
      periode: [''],
      datedebut: [''],
      datefin: [''],
    });
  }
  saveLibelleD(){
    this.globals.inputD=this.libelleD;
  }
  ajouterPeriode() {
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    control.push(this.initItemRows());
  }

  deleteRow(index: number) {
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    control.removeAt(index);
  }



  ajouterPeriodeModif() {
    const control = <FormArray>this.invoiceFormModif.controls['periodeDecoup'];
    control.push(this.initItemRowsModif());;
  }

  deleteRowModif(index: number) {
    const control = <FormArray>this.invoiceFormModif.controls['periodeDecoup'];
    control.removeAt(index);
  }
  initItemRowsModif() {
    return this._b.group({
      periodeM: [''],
      datedebutM: [''],
      datefinM: [''],
    });
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
  ngOnInit() {

    this.authServ.getgroupe().subscribe(res => {
      console.log(res);
      this.data=[]
      if(res.id){
         this.eco.getEcoles(res.id).subscribe(res1=>{
           this.data = res1
        })

      }
      else{
         this.eco.getEcoles(this.authServ.getNomGroupe()).subscribe(res1=>{
          this.data = res1
        })

      }
    })

    const $ = window["$"];

    $(function () {
      $('[data-toggle="tooltip"]').tooltip({
        animated: 'fade',
        placement: 'right',
        html: true
      });


      $('#idCouleurBarreTache').colorpicker();
      $('#idCouleurEx').colorpicker();


    });




    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()])

    });

    this.invoiceFormModif = this._b.group({
      periodeDecoup: this._b.array([this.initItemRowsModif()])
    });



    $(function () {
      $('#my-color-externe').colorpicker();
      $('#color-externe-componentt').colorpicker();
      $('#my-color-barre-tache').colorpicker();
      $('#color-barre-tache-componentt').colorpicker();
      $('#BSbtndanger').filestyle({
        buttonName : 'btn-danger',
        buttonText : ' <img src="../../../assets/images/picto_modifier.png" class="file_image"><img src="../../../assets/images/vignette.png" class="file_image">'
    });

    });











    $(document).ready(function() {
//////////////////////////////////////////////////////////checkAll(Modif)/////////////////////////////////////////////////////////
      $('#checkAll').on('change', function () {
        if ($('#checkAll').is(':checked')) {
          $("input[name=bullClasses]").prop('checked', $(this).prop("checked"));
          $("input[name=bullEleves]").prop('checked', $(this).prop("checked"));
          $("input[name=carnet]").prop('checked', $(this).prop("checked"));
          $("input[name=bilanAbs]").prop('checked', $(this).prop("checked"));
          $("input[name=docP]").prop('checked', $(this).prop("checked"));
          $("input[name=galerie]").prop('checked', $(this).prop("checked"));
          $("input[name=docRecu]").prop('checked', $(this).prop("checked"));
          $("input[name=docPublie]").prop('checked', $(this).prop("checked"));
          $("input[name=eDTProf]").prop('checked', $(this).prop("checked"));
          $("input[name=eDTClasses]").prop('checked', $(this).prop("checked"));
          $("input[name=calendrierS]").prop('checked', $(this).prop("checked"));
          $("#input_Calender").addClass("colorCheck");
          $("#input_Galerie").addClass("colorCheck");
          $("#input_Abs").addClass("colorCheck");
          $("#input_BullClasses").addClass("colorCheck");
          $("#input_BullEleves").addClass("colorCheck");
          $("#input_Carnet").addClass("colorCheck");
          $("#input_DocP").addClass("colorCheck");
          $("#input_DocPublie").addClass("colorCheck");
          $("#input_DocRecue").addClass("colorCheck");
          $("#input_EDTclasse").addClass("colorCheck");
          $("#input_EDTprof").addClass("colorCheck");
        } else {
          $("input[name=bullClasses]").prop('checked',false);
          $("input[name=bullEleves]").prop('checked',false);
          $("input[name=carnet]").prop('checked',false);
          $("input[name=bilanAbs]").prop('checked',false);
          $("input[name=docP]").prop('checked', $(this).prop("checked"));
          $("input[name=galerie]").prop('checked', $(this).prop("checked"));
          $("input[name=docRecu]").prop('checked', $(this).prop("checked"));
          $("input[name=docPublie]").prop('checked', $(this).prop("checked"));
          $("input[name=eDTProf]").prop('checked', $(this).prop("checked"));
          $("input[name=eDTClasses]").prop('checked', $(this).prop("checked"));
          $("input[name=calendrierS]").prop('checked', $(this).prop("checked"));
          $("#input_Calender").removeClass("colorCheck");
          $("#input_Galerie").removeClass("colorCheck");
          $("#input_Abs").removeClass("colorCheck");
          $("#input_BullClasses").removeClass("colorCheck");
          $("#input_BullEleves").removeClass("colorCheck");
          $("#input_Carnet").removeClass("colorCheck");
          $("#input_DocP").removeClass("colorCheck");
          $("#input_DocPublie").removeClass("colorCheck");
          $("#input_DocRecue").removeClass("colorCheck");
          $("#input_EDTclasse").removeClass("colorCheck");
          $("#input_EDTprof").removeClass("colorCheck");
        }
      });



      //////////////////////////////////////////////////////////checkAll(Ajout)/////////////////////////////////////////////////////////
      $('#checkupAll').on('change', function () {
        if ($('#checkupAll').is(':checked')) {
          $("input[name=bullClasses]").prop('checked', $(this).prop("checked"));
          $("input[name=bullEleves]").prop('checked', $(this).prop("checked"));
          $("input[name=carnet]").prop('checked', $(this).prop("checked"));
          $("input[name=bilanAbs]").prop('checked', $(this).prop("checked"));
          $("input[name=docP]").prop('checked', $(this).prop("checked"));
          $("input[name=galerie]").prop('checked', $(this).prop("checked"));
          $("input[name=docRecu]").prop('checked', $(this).prop("checked"));
          $("input[name=docPublie]").prop('checked', $(this).prop("checked"));
          $("input[name=eDTProf]").prop('checked', $(this).prop("checked"));
          $("input[name=eDTClasses]").prop('checked', $(this).prop("checked"));
          $("input[name=calendrierS]").prop('checked', $(this).prop("checked"));
          $("#upinput_Calender").addClass("colorCheck");
          $("#upinput_Galerie").addClass("colorCheck");
          $("#upinput_Abs").addClass("colorCheck");
          $("#upinput_BullClasses").addClass("colorCheck");
          $("#upinput_BullEleves").addClass("colorCheck");
          $("#upinput_Carnet").addClass("colorCheck");
          $("#upinput_DocP").addClass("colorCheck");
          $("#upinput_DocPublie").addClass("colorCheck");
          $("#upinput_DocRecue").addClass("colorCheck");
          $("#upinput_EDTclasse").addClass("colorCheck");
          $("#upinput_EDTprof").addClass("colorCheck");
        } else {
          $("input[name=bullClasses]").prop('checked',false);
          $("input[name=bullEleves]").prop('checked',false);
          $("input[name=carnet]").prop('checked',false);
          $("input[name=bilanAbs]").prop('checked',false);
          $("input[name=docP]").prop('checked', $(this).prop("checked"));
          $("input[name=galerie]").prop('checked', $(this).prop("checked"));
          $("input[name=docRecu]").prop('checked', $(this).prop("checked"));
          $("input[name=docPublie]").prop('checked', $(this).prop("checked"));
          $("input[name=eDTProf]").prop('checked', $(this).prop("checked"));
          $("input[name=eDTClasses]").prop('checked', $(this).prop("checked"));
          $("input[name=calendrierS]").prop('checked', $(this).prop("checked"));
          $("#upinput_Calender").removeClass("colorCheck");
          $("#upinput_Galerie").removeClass("colorCheck");
          $("#upinput_Abs").removeClass("colorCheck");
          $("#upinput_BullClasses").removeClass("colorCheck");
          $("#upinput_BullEleves").removeClass("colorCheck");
          $("#upinput_Carnet").removeClass("colorCheck");
          $("#upinput_DocP").removeClass("colorCheck");
          $("#upinput_DocPublie").removeClass("colorCheck");
          $("#upinput_DocRecue").removeClass("colorCheck");
          $("#upinput_EDTclasse").removeClass("colorCheck");
          $("#upinput_EDTprof").removeClass("colorCheck");
        }
      });


/////////////////////////////////Désactiver les inputs des Horaires//////////////////////////////////////////////////
      $('#checkLundi').on('change', function () {

        if ($('#checkLundi').is(':checked')) {
          $("#divLundi").addClass("disabledbutton");
        } else {
          $("#divLundi").removeClass("disabledbutton");
        }
      });
      $('#checkMardi').on('change', function () {

        if ($('#checkMardi').is(':checked')) {
          $("#divMardi").addClass("disabledbutton");
        } else {
          $("#divMardi").removeClass("disabledbutton");
        }
      });
      $('#checkMercredi').on('change', function () {

        if ($('#checkMercredi').is(':checked')) {
          $("#divMercredi").addClass("disabledbutton");
        } else {
          $("#divMercredi").removeClass("disabledbutton");
        }
      });
      $('#checkJeudi').on('change', function () {

        if ($('#checkJeudi').is(':checked')) {
          $("#divJeudi").addClass("disabledbutton");
        } else {
          $("#divJeudi").removeClass("disabledbutton");
        }
      });
      $('#checkVendredi').on('change', function () {

        if ($('#checkVendredi').is(':checked')) {
          $("#divVendredi").addClass("disabledbutton");
        } else {
          $("#divVendredi").removeClass("disabledbutton");
        }
      });
      $('#checkSamedi').on('change', function () {

        if ($('#checkSamedi').is(':checked')) {
          $("#divSamedi").addClass("disabledbutton");
        } else {
          $("#divSamedi").removeClass("disabledbutton");
        }
      });
      $('#checkDimanche').on('change', function () {

        if ($('#checkDimanche').is(':checked')) {
          $("#divDimanche").addClass("disabledbutton");
        } else {
          $("#divDimanche").removeClass("disabledbutton");
        }
      });

      /////////////////////////////////Désactiver les inputs des Horaires(Modif)//////////////////////////////////////////////////
      $('#upcheckLundi').on('change', function () {

        if ($('#upcheckLundi').is(':checked')) {
          $("#updivLundi").addClass("disabledbutton");
        } else {
          $("#updivLundi").removeClass("disabledbutton");
        }
      });
      $('#upcheckMardi').on('change', function () {

        if ($('#upcheckMardi').is(':checked')) {
          $("#updivMardi").addClass("disabledbutton");
        } else {
          $("#updivMardi").removeClass("disabledbutton");
        }
      });
      $('#upcheckMercredi').on('change', function () {

        if ($('#upcheckMercredi').is(':checked')) {
          $("#updivMercredi").addClass("disabledbutton");
        } else {
          $("#updivMercredi").removeClass("disabledbutton");
        }
      });
      $('#upcheckJeudi').on('change', function () {

        if ($('#upcheckJeudi').is(':checked')) {
          $("#updivJeudi").addClass("disabledbutton");
        } else {
          $("#updivJeudi").removeClass("disabledbutton");
        }
      });
      $('#upcheckVendredi').on('change', function () {

        if ($('#upcheckVendredi').is(':checked')) {
          $("#updivVendredi").addClass("disabledbutton");
        } else {
          $("#updivVendredi").removeClass("disabledbutton");
        }
      });
      $('#upcheckSamedi').on('change', function () {

        if ($('#upcheckSamedi').is(':checked')) {
          $("#updivSamedi").addClass("disabledbutton");
        } else {
          $("#updivSamedi").removeClass("disabledbutton");
        }
      });

      $('#upcheckDimanche').on('change', function () {

        if ($('#upcheckDimanche').is(':checked')) {
          $("#updivDimanche").addClass("disabledbutton");
        } else {
          $("#updivDimanche").removeClass("disabledbutton");
        }
      });


//////////////////////////////////////colorer les inputs dans l'onglet Donnee Serveur(Ajout)/////////////////////////////////
      $('#check_Calender').on('change', function () {

        if ($('#check_Calender').is(':checked')) {
          $("#input_Calender").addClass("colorCheck");
        } else {
          $("#input_Calender").removeClass("colorCheck");

        }
      });
      $('#check_Galerie').on('change', function () {

        if ($('#check_Galerie').is(':checked')) {
          $("#input_Galerie").addClass("colorCheck");
        } else {
          $("#input_Galerie").removeClass("colorCheck");

        }
      });
      $('#check_Abs').on('change', function () {

        if ($('#check_Abs').is(':checked')) {
          $("#input_Abs").addClass("colorCheck");
        } else {
          $("#input_Abs").removeClass("colorCheck");

        }
      });
      $('#check_BullClasses').on('change', function () {

        if ($('#check_BullClasses').is(':checked')) {
          $("#input_BullClasses").addClass("colorCheck");
        } else {
          $("#input_BullClasses").removeClass("colorCheck");

        }
      });
      $('#check_BullEleves').on('change', function () {

        if ($('#check_BullEleves').is(':checked')) {
          $("#input_BullEleves").addClass("colorCheck");
        } else {
          $("#input_BullEleves").removeClass("colorCheck");

        }
      });
      $('#check_Carnet').on('change', function () {

        if ($('#check_Carnet').is(':checked')) {
          $("#input_Carnet").addClass("colorCheck");
        } else {
          $("#input_Carnet").removeClass("colorCheck");

        }
      });
      $('#check_DocP').on('change', function () {

        if ($('#check_DocP').is(':checked')) {
          $("#input_DocP").addClass("colorCheck");
        } else {
          $("#input_DocP").removeClass("colorCheck");

        }
      });
      $('#check_DocPublie').on('change', function () {

        if ($('#check_DocPublie').is(':checked')) {
          $("#input_DocPublie").addClass("colorCheck");
        } else {
          $("#input_DocPublie").removeClass("colorCheck");

        }
      });
      $('#check_DocRecue').on('change', function () {

        if ($('#check_DocRecue').is(':checked')) {
          $("#input_DocRecue").addClass("colorCheck");
        } else {
          $("#input_DocRecue").removeClass("colorCheck");

        }
      });
      $('#check_EDTclasse').on('change', function () {

        if ($('#check_EDTclasse').is(':checked')) {
          $("#input_EDTclasse").addClass("colorCheck");
        } else {
          $("#input_EDTclasse").removeClass("colorCheck");

        }
      });
      $('#check_EDTprof').on('change', function () {

        if ($('#check_EDTprof').is(':checked')) {
          $("#input_EDTprof").addClass("colorCheck");
        } else {
          $("#input_EDTprof").removeClass("colorCheck");

        }
      });



      //////////////////////////////////////colorer les inputs dans l'onglet Donnee Serveur(Modif)/////////////////////////////////
      $('#upcheck_Calender').on('change', function () {

        if ($('#upcheck_Calender').is(':checked')) {
          $("#upinput_Calender").addClass("colorCheck");
        } else {
          $("#upinput_Calender").removeClass("colorCheck");

        }
      });
      $('#upcheck_Galerie').on('change', function () {

        if ($('#upcheck_Galerie').is(':checked')) {
          $("#upinput_Galerie").addClass("colorCheck");
        } else {
          $("#upinput_Galerie").removeClass("colorCheck");

        }
      });
      $('#upcheck_Abs').on('change', function () {

        if ($('#upcheck_Abs').is(':checked')) {
          $("#upinput_Abs").addClass("colorCheck");
        } else {
          $("#upinput_Abs").removeClass("colorCheck");

        }
      });
      $('#upcheck_BullClasses').on('change', function () {

        if ($('#upcheck_BullClasses').is(':checked')) {
          $("#upinput_BullClasses").addClass("colorCheck");
        } else {
          $("#upinput_BullClasses").removeClass("colorCheck");

        }
      });
      $('#upcheck_BullEleves').on('change', function () {

        if ($('#upcheck_BullEleves').is(':checked')) {
          $("#upinput_BullEleves").addClass("colorCheck");
        } else {
          $("#upinput_BullEleves").removeClass("colorCheck");

        }
      });
      $('#upcheck_Carnet').on('change', function () {

        if ($('#upcheck_Carnet').is(':checked')) {
          $("#upinput_Carnet").addClass("colorCheck");
        } else {
          $("#upinput_Carnet").removeClass("colorCheck");

        }
      });
      $('#upcheck_DocP').on('change', function () {

        if ($('#upcheck_DocP').is(':checked')) {
          $("#upinput_DocP").addClass("colorCheck");
        } else {
          $("#upinput_DocP").removeClass("colorCheck");

        }
      });
      $('#upcheck_DocPublie').on('change', function () {

        if ($('#check_DocPublie').is(':checked')) {
          $("#upinput_DocPublie").addClass("colorCheck");
        } else {
          $("#upinput_DocPublie").removeClass("colorCheck");

        }
      });
      $('#upcheck_DocRecue').on('change', function () {

        if ($('#upcheck_DocRecue').is(':checked')) {
          $("#upinput_DocRecue").addClass("colorCheck");
        } else {
          $("#upinput_DocRecue").removeClass("colorCheck");

        }
      });
      $('#upcheck_EDTclasse').on('change', function () {

        if ($('#upcheck_EDTclasse').is(':checked')) {
          $("#upinput_EDTclasse").addClass("colorCheck");
        } else {
          $("#upinput_EDTclasse").removeClass("colorCheck");

        }
      });
      $('#upcheck_EDTprof').on('change', function () {

        if ($('#upcheck_EDTprof').is(':checked')) {
          $("#upinput_EDTprof").addClass("colorCheck");
        } else {
          $("#upinput_EDTprof").removeClass("colorCheck");

        }
      });



      /////////////////////////////////////////passage des Onglets(Ajout) NewMaquette////////////////////////////////////////////////
      $('#clickInfo').on('click', function () {
        $('a[href="#plateforme"]').trigger('click');
      });
      $('#clickPerso').on('click', function () {
        $('a[href="#scolaire"]').trigger('click');
      });
      $('#clickscolaire').on('click', function () {
        $('a[href="#serveur"]').trigger('click');
      });


/////////////////////////////////////////passage des Onglets(Modif) NewMaquette////////////////////////////////////////////////
      $('#upclickInfo').on('click', function () {
        $('a[href="#upPlateforme"]').trigger('click');
      });
      $('#upclickPerso').on('click', function () {
        $('a[href="#upScolaire"]').trigger('click');
      });
      $('#upclickscolaire').on('click', function () {
        $('a[href="#upServeur"]').trigger('click');
      });


      ///////////////
      $('#btnModif').on('click', function () {
        if (($('#upcheck_Calender').is(":not(:checked)")) && ($('#upcheck_Galerie').is(":not(:checked)")) && ($('#upcheck_Abs').is(":not(:checked)")) && ($('#upcheck_BullClasses').is(":not(:checked)")) && ( $('#upcheck_BullEleves').is(":not(:checked)"))
          && ($('#upcheck_Carnet').is(":not(:checked)"))
          && ($('#upcheck_DocP').is(":not(:checked)"))
          && ($('#upcheck_DocPublie').is(":not(:checked)"))
          && ($('#upcheck_DocRecue').is(":not(:checked)"))
          && ($('#upcheck_EDTclasse').is(":not(:checked)"))
          && ($('#upcheck_EDTprof').is(":not(:checked)"))) {
          console.log("yessss")

          $("#ModalPasSauvegarde").modal("show");
        }
        else{
          $("#ModalDS").modal("show");
        }
      });

    });




    $(function(){
      $('#buttonAdd').click(function(){
        $(":input[type=time]","#myForm")
          .val('')
        $(":input[type=date]","#myForm")
          .val('')
        $(":input[type=color]","#myForm")
          .val('')
        $(":input[type=text]","#myForm").not(":input[name=groupeScolaire]")
          .val('')
        $('#check_perso').prop('checked',false);
        $('#checkLundi').prop('checked',false);
        $('#divLundi').removeClass("disabledbutton")
        $('#checkMardi').prop('checked',false);
        $('#divMardi').removeClass("disabledbutton")
        $('#checkMercredi').prop('checked',false);
        $('#divMercredi').removeClass("disabledbutton")
        $('#checkJeudi').prop('checked',false);
        $('#divJeudi').removeClass("disabledbutton")
        $('#checkVendredi').prop('checked',false);
        $('#divVendredi').removeClass("disabledbutton")
        $('#checkSamedi').prop('checked',false);
        $('#divSamedi').removeClass("disabledbutton")
        $('#checkDimanche').prop('checked',false);
        $('#divDimanche').removeClass("disabledbutton")
        $('#check_Calender').prop('checked',false);
        $('#check_Galerie').prop('checked',false);
        $('#check_Abs').prop('checked',false);
        $('#check_BullClasses').prop('checked',false);
        $('#check_BullEleves').prop('checked',false);
        $('#check_Carnet').prop('checked',false);
        $('#check_DocP').prop('checked',false);
        $('#check_DocPublie').prop('checked',false);
        $('#check_DocRecue').prop('checked',false);
        $('#check_EDTclasse').prop('checked',false);
        $('#check_EDTprof').prop('checked',false);
        $("#input_Calender").removeClass("colorCheck");
        $('#input_Galerie').removeClass("colorCheck");
        $('#input_Abs').removeClass("colorCheck");
        $('#input_BullClasses').removeClass("colorCheck");
        $('#input_BullEleves').removeClass("colorCheck");
        $('#input_Carnet').removeClass("colorCheck");
        $('#input_DocP').removeClass("colorCheck");
        $('#input_DocPublie').removeClass("colorCheck");
        $('#input_DocRecue').removeClass("colorCheck");
        $('#input_EDTclasse').removeClass("colorCheck");
        $('#input_EDTprof').removeClass("colorCheck");
      });
    });




  }

  ngAfterViewInit(){
    const $ = window["$"];
      $("#upEcole").on("show.bs.modal", function(e) {
      $('#checkPersoo').trigger('change');
      $('#upcheckDimanche').trigger('change');
      $('#upcheckSamedi').trigger('change');
      $('#upcheckLundi').trigger('change');
      $('#upcheckMardi').trigger('change');
      $('#upcheckMercredi').trigger('change');
      $('#upcheckJeudi').trigger('change');
      $('#upcheckVendredi').trigger('change');
      $('#upcheck_Calender').trigger('change');
      $('#upcheck_Galerie').trigger('change');
      $('#upcheck_Abs').trigger('change');
      $('#upcheck_BullClasses').trigger('change');
      $('#upcheck_BullEleves').trigger('change');
      $('#upcheck_Carnet').trigger('change');
      $('#upcheck_DocP').trigger('change');
      $('#upcheck_DocPublie').trigger('change');
      $('#upcheck_DocRecue').trigger('change');
      $('#upcheck_EDTclasse').trigger('change');
      $('#upcheck_EDTprof').trigger('change');
  });
}
}


