import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {GroupeScolaireService} from "../../services/groupe-scolaire.service";
import {Router} from "@angular/router";

import{HttpClient} from '@angular/common/http';

import * as $ from 'jquery';
import {Globals} from "../../models/globals";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],


})

export class NavbarComponent implements OnInit, AfterViewInit  {

  user:any='';
  nom:any='';
  prenom:any='';

  color_externe     :string = '#cccccc';
  color_barre_tache :string = '#dddddd';
  groupeScolaires: any = '';
  nomG: any = '';
  nomGroupe: any='';
  id:any = '';

  presentation:any = '';
  titrePresentation: any = '';
  couleurBarreTache: any = '';
  couleurExterne: any = '';

  imgPageCnx: any = '';
  logoPageCnx: any = '';
  logoBarreTache: any = '';
  photoPresentation: any = '';


  selectedFile: File= null;
  pathImagePageCx: any='';
  pathLogoCx: any ='';
  pathLogoBtache: any='';
  pathPhotoPresentation: any='';

  color:any='';
  connectedUser:any='';


  constructor(private GSservice: GroupeScolaireService,private authServ: AuthService,private router: Router, private http: HttpClient, private globals: Globals ) {

    this.groupeScolaires = GSservice.getGroupeScolaires();
    this.connectedUser=authServ.getConnectedUser();
    console.log(this.connectedUser);
    if(this.connectedUser){
      this.nom= this.connectedUser['nom'];
      console.log("nommmmm",this.nom)
  this.prenom= this.connectedUser['prenom'];
    }
     
  }



  onChange(nom) {
    this.authServ.setgroupe(nom)
    this.authServ.setNomGroupe(nom);
  }



  isSelected(nom){

    if (nom === this.authServ.getNomGroupe()){
      return true;
    }
    return false;
  }



  ////////////////////////////////////////////////////////////////uploads/////////////////////////////////////////////////////////////////////
/////////////////////////////////////upload image page connexion

  onFileSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd = new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/api/upload',fd).subscribe(res =>{
      console.log("res",res);

      this.pathImagePageCx=res;



    })

  }
/////////////////////////////////////////upload logo barre de tache

  onLogoBtacheSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/api/upload',fd).subscribe(res =>{
      console.log("res",res);

      this.pathLogoBtache=res;


    })

  }

//////////////////////////////////////////upload logo page connexion
  onLogoPageConxSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/api/upload',fd).subscribe(res =>{//appeler service d'upload l'image et retourner le nom comme resultat
      console.log("res",res);

      this.pathLogoCx=res;



    })

  }
  //////////////////////////////////upload image presentation/////////////////////////////


  onPhotoPresentationSelected(event){

    this.selectedFile=<File>event.target.files[0];

    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/api/upload',fd).subscribe(res =>{//appeler service d'upload l'image et retourner le nom comme resultat
      console.log("res",res);

      this.pathPhotoPresentation=res;



    })

  }
////////////////////////////////////////////
  estNonVidee(chaine){
    if(chaine == ""){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }


  onchangeColor(event)
  {
    this.color=event.target.value;
    $("#color").css("background-color", this.color);
  }


  //////log out /////////////////////////////
  logoutClicked(event: Event){

    event.preventDefault(); // Prevents browser following the link
    console.log('click');
    this.authServ.wissemlogoutUser()
    //this.authServ.logoutUser();
  }

  ngOnInit(){
    const $ = window["$"];
    $(function () {
      $('#color-externe-component').colorpicker();
      $('#color-barre-tache-component').colorpicker();

      $('#color-externe-component-m').colorpicker();
      $('#color-barre-tache-component-m').colorpicker();
    });
  }

  ngAfterViewInit(){
    const $ = window["$"];
    /*$(function () {alert("yes");});*/
    setTimeout(function () {
      var x, i, j, selElmnt, a, b, c;
      /*look for any elements with the class "custom-select":*/
      x = document.getElementsByClassName("custom-select");
      for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        console.log(a);
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
          /*for each option in the original select element,
           create a new DIV that will act as an option item:*/
          c = document.createElement("DIV");
          c.innerHTML = selElmnt.options[j].innerHTML;
          c.addEventListener("click", function(e) {
            /*when an item is clicked, update the original select box,
             and the selected item:*/
            var i, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                break;
              }
            }
            h.click();
          });
          b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
          /*when the select box is clicked, close any other select boxes,
           and open/close the current select box:*/
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling.classList.toggle("select-hide");
          this.classList.toggle("select-arrow-active");
        });
      }
    },2000);

    function closeAllSelect(elmnt) {
      /*a function that will close all select boxes in the document,
       except the current select box:*/
      var x, y, i, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }
    /*if the user clicks anywhere outside the select box,
     then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);

  }
}
