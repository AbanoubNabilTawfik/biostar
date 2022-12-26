import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/@biostar/services/auth.guard';
import { ListComponent } from './list/list.component';
const routes: Routes = [

  {  
    path: 'list', 
    component: ListComponent , 
    data:{title:'users List'},canActivate:[AuthGuard]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
