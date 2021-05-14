import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewComponent} from './view/view.component';
import {AddLocationComponent} from './add/add-location.component';
import {DetailedViewComponent} from './detailed-view/detailed-view.component';


const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
  },
  {
    path: 'add',
    component: AddLocationComponent
  },
  {
    path: 'view/:id',
    component: DetailedViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {
}
