import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from '../people/view/view.component';
import {RouterModule} from '@angular/router';
import {PeopleRoutingModule} from './people-routing.module';
import { DetailedViewComponent } from '../people/detailed-view/detailed-view.component';
import {PeopleComponent} from './people.component';
import {AddPersonComponent} from './add/add-person.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ViewComponent,
    PeopleComponent,
    AddPersonComponent,
    DetailedViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PeopleRoutingModule
  ]
})
export class PeopleModule { }
