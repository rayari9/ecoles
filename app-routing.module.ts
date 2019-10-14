import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//component
import {PersonnelscolaireComponent} from "./home/personnelscolaire/personnelscolaire.component";
import {SuperAdminComponent} from "./home/superadmin/superadmin.component";
import { TestComponent } from './components/test/test.component';
import {TesttComponent} from "./home/test/testt.component";
import { DirecteurComponent } from './home/directeur/directeur.component';
import { EnseignantsComponent } from './home/enseignants/enseignants.component';
import { HomeGroupeScolaireComponent } from './home-groupe-scolaire/home-groupe-scolaire.component';
import { ConnexionGroupeComponent } from './connexion-groupe/connexion-groupe.component';
import {MatieresComponent} from "./home/matieres/matieres.component";
import {ElevesComponent} from "./home/eleves/eleves.component";
import {EcolesComponent} from "./home/ecoles/ecoles.component";
import {ClassesComponent} from "./home/classes/classes.component";
import {ParentsComponent} from "./home/parents/parents.component";
import {GroupeScolairesComponent} from "./home/groupe-scolaires/groupe-scolaires.component";
import {ConnexionComponent } from './connexion/connexion.component';
import {LayoutComponent} from "./home/layout/layout.component";
import {HomeComponent} from "./home/home.component";

//authgard service
import {AuthGuard} from "./auth.guard";


const routes: Routes =  [

  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {path: 'admin',component:ConnexionComponent },
  {path: 'connexion', component:ConnexionGroupeComponent},

  {

    path: 'home', component: HomeComponent,

    children: [
      {path: '',canActivate:[AuthGuard], component: LayoutComponent},
      {path: 'eleve', canActivate:[AuthGuard],component: ElevesComponent},
      {path: 'parent', canActivate:[AuthGuard],component: ParentsComponent},
      {path: 'ecole', canActivate:[AuthGuard],component: EcolesComponent},
      {path: 'groupscolaires', canActivate:[AuthGuard],component: GroupeScolairesComponent},
      {path: 'matiere', canActivate:[AuthGuard],component: MatieresComponent},
      {path: 'directeur',canActivate:[AuthGuard], component: DirecteurComponent},
      {path: 'enseignants', canActivate:[AuthGuard],component: EnseignantsComponent},
      {path: 'personnel', canActivate:[AuthGuard],component: PersonnelscolaireComponent},
      {path: 'superadmin',canActivate:[AuthGuard], component: SuperAdminComponent},
      {path: 'classe',canActivate:[AuthGuard], component: ClassesComponent},
      {path: 'test',component: TestComponent},
      {path: 'testt', component: TesttComponent},
    ]
  },


  //routes home groupe scolaire
  { path: 'home-groupe-scolaire', component: HomeGroupeScolaireComponent,
    children: [
    ]
  },

  { path: '**', redirectTo: 'admin' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
