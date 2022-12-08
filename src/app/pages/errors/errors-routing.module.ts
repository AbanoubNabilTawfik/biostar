import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';

const routes = [

  {
    path: 'error-403',
    component: Error403Component,
    data: {
      containerEnabled: true,
      toolbarShadowEnabled: true,
      title:'Not Allowed',
    }
  },
  {
    path: 'error-404',
    component: Error404Component,
    data: {
      containerEnabled: true,
      toolbarShadowEnabled: true,
      title:'Not Found',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
