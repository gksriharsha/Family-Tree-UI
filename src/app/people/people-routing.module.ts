import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {PeopleComponent} from './people.component';
import {DetailedViewComponent} from './detailed-view/detailed-view.component';
import {ViewComponent} from './view/view.component';
import {AddPersonComponent} from './add/add-person.component';


const routes:Routes = [
  {
    path:'',
    component:PeopleComponent,
    children:[
      {
        path:'add',
        component:AddPersonComponent
      },
      {
        path:'view/:id',
        component:DetailedViewComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule {}

