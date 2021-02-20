import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from '../people/view/view.component';
import {RouterModule} from '@angular/router';
import {PeopleRoutingModule} from './people-routing.module';
import { DetailedViewComponent } from '../people/detailed-view/detailed-view.component';
import {HttpClientModule} from '@angular/common/http';
import {PeopleComponent} from './people.component';
import {AddPersonComponent} from './add/add-person.component';



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
    PeopleRoutingModule
  ]
})
export class PeopleModule { }
