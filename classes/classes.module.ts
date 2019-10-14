import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';

@NgModule({
  imports: [
    CommonModule,
    ClassesRoutingModule
  ],
  declarations: [ClassesComponent]
})
export class ClassesModule { }
