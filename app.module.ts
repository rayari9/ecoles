import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LayoutComponent} from "./home/layout/layout.component";
import {HomeComponent} from "./home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ElevesComponent} from "./home/eleves/eleves.component";
import {EcolesComponent} from "./home/ecoles/ecoles.component";
import {ClassesComponent} from "./home/classes/classes.component";
import {ParentsComponent} from "./home/parents/parents.component";
import {GroupeScolairesComponent} from "./home/groupe-scolaires/groupe-scolaires.component";
import {NavbarComponent} from "./home/navbar/navbar.component";
import {SidebarComponent} from "./home/sidebar/sidebar.component";
import {ConnexionComponent } from './connexion/connexion.component';
import {HttpClientModule} from "@angular/common/http";
import {MatieresComponent} from "./home/matieres/matieres.component";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./auth.guard";
import {ToastrModule, ToastrService} from "ngx-toastr";
import { ConnexionGroupeComponent } from './connexion-groupe/connexion-groupe.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EcoleService} from "./services/ecole.service";
import {GroupeScolaireService} from "./services/groupe-scolaire.service";
import {Ng2Webstorage} from "ngx-webstorage";
import { HomeGroupeScolaireComponent } from './home-groupe-scolaire/home-groupe-scolaire.component';
import { NavbarGroupesScolaireComponent } from './home-groupe-scolaire/navbar-groupes-scolaire/navbar-groupes-scolaire.component';
import { SidebarGroupesScolaireComponent } from './home-groupe-scolaire/sidebar-groupes-scolaire/sidebar-groupes-scolaire.component';
import { FilterGroupePipe } from './filters/filter-groupe.pipe';
import {MatiereService} from "./services/matiere.service";
import {ClasseService} from "./services/classe.service";
import {ParentService} from "./services/parent.service";
import {EleveService} from "./services/eleve.service";
import { DirecteurComponent } from './home/directeur/directeur.component';
import { EnseignantsComponent } from './home/enseignants/enseignants.component';
import {CompteProService} from "./services/comptePro.service";
import {EcolesNamePipe} from "./filters/ecoles-name.pipe";
import {TesttComponent} from "./home/test/testt.component";
import { ShowErrorsComponent } from './show-errors.component';
import { BirthYearValidatorDirective } from './validators/birth-year-validator.directive';
import { EmailValidatorDirective } from './validators/mail-validator.directive';
import { TelephoneNumberFormatValidatorDirective } from './validators/telephone-number-format-validator.directive';
import { CountryCityValidatorDirective } from './validators/country-city-validator.directive';
import { TelephoneNumbersValidatorDirective } from './validators/telephone-numbers-validator.directive';
import { UniqueNameValidatorDirective } from './validators/name-unique-validator.directive';
import { PersonnelsComponent } from './home/personnels/personnels.component';
import { ListMatiersComponent } from './components/list-matiers/list-matiers.component';
import { TestComponent } from './components/test/test.component';
import { ExpComponent } from './components/exp/exp.component';

import {MatiereOptionnnelleComponent} from "./home/eleves/matiere-optionnelle.component";
import {ListElevesComponent} from "./home/eleves/listEleves.component";
import {Globals} from "./models/globals";
import {PersonnelscolaireComponent} from "./home/personnelscolaire/personnelscolaire.component";
import {SuperAdminComponent} from "./home/superadmin/superadmin.component";
import {ColorPickerModule} from "ng-color-picker";
import {DataTableModule} from "angular2-datatable";
import {ElevesPipe} from "./filters/eleves.pipe";
import {ParentsPipe} from "./filters/parents.pipe";
import {MatieresPipe} from "./filters/matieres.pipe";
import { AppRoutingModule } from './app-routing.module';
import {ImportationExcelComponent} from "./home/importation-excel/importation-excel.component";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    LayoutComponent,
    ConnexionComponent,
    DirecteurComponent,
    EnseignantsComponent,
    PersonnelscolaireComponent,
    EcolesComponent,
    GroupeScolairesComponent,
    MatieresComponent,
    ConnexionGroupeComponent,
    HomeGroupeScolaireComponent,
    NavbarGroupesScolaireComponent,
    SidebarGroupesScolaireComponent,
    FilterGroupePipe,
    //eleve + parent + matiere
    ElevesComponent,
    ParentsComponent,
    EcolesNamePipe,
    ElevesPipe,
    ParentsPipe,
    MatieresPipe,
    ClassesComponent,
    TesttComponent,
    ShowErrorsComponent,
    BirthYearValidatorDirective,
    EmailValidatorDirective,
    TelephoneNumberFormatValidatorDirective,
    CountryCityValidatorDirective,
    TelephoneNumbersValidatorDirective,
    UniqueNameValidatorDirective,
    PersonnelsComponent,
    ListMatiersComponent,
    ListElevesComponent,
    SuperAdminComponent,
    TestComponent,
    ExpComponent,
    MatiereOptionnnelleComponent,
    ImportationExcelComponent
  ],
  entryComponents: [
    ExpComponent,
    ListMatiersComponent,
    MatiereOptionnnelleComponent,
    ListElevesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DataTableModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Ng2Webstorage,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    EcoleService,
    CompteProService,
    GroupeScolaireService,
    EleveService,ParentService,
    ClasseService,MatiereService,
    [Globals]
    //CompteProService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
