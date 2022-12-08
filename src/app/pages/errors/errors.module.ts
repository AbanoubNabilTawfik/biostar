import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { Error403Component } from './error403/error403.component';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { IconModule } from '@visurel/iconify-angular';
// import { LayoutModule } from '../layout/layout.module';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [Error403Component, Error404Component],
  imports: [
    CommonModule,
    ErrorsRoutingModule,
    // FlexLayoutModule,
    // IconModule,
    // LayoutModule
  ]
})
export class ErrorsModule { }
