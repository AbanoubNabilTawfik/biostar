import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { DetailsComponent } from './details/details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToolbarUserModule } from 'src/@vex/layout/toolbar/toolbar-user/toolbar-user.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
// import { NgxMaskModule } from 'ngx-mask';
// import { MaterialFileInputModule } from 'ngx-material-file-input';
// import { NgPipesModule } from 'ngx-pipes';
// import { NgxSpinnerModule } from 'ngx-spinner';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { ApplicationPipesModule } from 'src/app/application-pipes/application-pipes.module';
// import { NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
// import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker/public-api';


@NgModule({
  declarations: [ListComponent, CreateEditComponent, DetailsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatDialogModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  FormsModule,
  ReactiveFormsModule,
  ScrollbarModule,
  // NgxSpinnerModule,
  
  NgbModule,
  // Angular Material Design 
  // VexModule,
  ToolbarUserModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatRadioModule,
  PageLayoutModule,
  FlexLayoutModule,
  MatButtonModule,
  MatIconModule,
  MatRippleModule,
  MatSelectModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  BreadcrumbsModule,
  MatSortModule,
  IconModule,
  MatTooltipModule,
  ContainerModule,
  MatButtonToggleModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatDividerModule,
  MatSidenavModule,
  MatStepperModule,
  // MaterialFileInputModule,
  // NgxSpinnerModule,
  // NgPipesModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  NgxSpinnerModule,
  // NgxMatDatetimePickerModule,
  ApplicationPipesModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class UsersModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}