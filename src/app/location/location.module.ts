import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import {LocationRoutingModule} from './location-routing.module';
import { AddLocationComponent } from './add/add-location.component';
import {FormsModule} from '@angular/forms';
import { DetailedViewComponent } from './detailed-view/detailed-view.component';



@NgModule({
  declarations: [ViewComponent, AddLocationComponent, DetailedViewComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    FormsModule
  ]
})
export class LocationModule { }
