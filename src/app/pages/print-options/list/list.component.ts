import { Component, OnInit, Input, ViewChild } from "@angular/core";
import icSearch from "@iconify/icons-ic/twotone-search";
import icAdd from "@iconify/icons-ic/twotone-add";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icFolder from "@iconify/icons-ic/twotone-folder";
import icFilterList from "@iconify/icons-ic/twotone-filter-list";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icMail from "@iconify/icons-ic/twotone-mail";
import icMap from "@iconify/icons-ic/twotone-map";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import { FormControl } from "@angular/forms";
import { filter } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { SelectionModel } from "@angular/cdk/collections";
import { ReplaySubject, Observable, of } from "rxjs";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { untilDestroyed, UntilDestroy } from "@ngneat/until-destroy";
import { MatSelectChange } from "@angular/material/select";

// import { NgxSpinnerService } from 'ngx-spinner';
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "src/@biostar/services/users.service";
import { CreateEditComponent } from "../create-edit/create-edit.component";
import { NgxSpinnerService } from "ngx-spinner";
import { PrintOptionsService } from "src/@biostar/services/PrintOptions.service";
import { CommonService } from "src/@biostar/services/common.service";

@UntilDestroy()
@Component({
  selector: "vex-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  animations: [fadeInUp400ms, stagger40ms],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "standard",
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class ListComponent implements OnInit {
  layoutCtrl = new FormControl("boxed");

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  Issues: any[];

  @Input()
  columns: TableColumn<any>[] = [
    {
      label: "#",
      property: "index",
      type: "index",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    // {
    //   label: "Photo",
    //   property: "photo",
    //   type: "array3",
    //   cssClasses: ["text-secondary"],
    //   visible: true,
    // },

    {
      label: "backgroundPic",
      property: "backgroundPic",
      type: "array3",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "cardHight",
      property: "cardHight",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "cardWidth",
      property: "cardWidth",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "fontSize",
      property: "fontSize",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "fontStyle",
      property: "fontStyle",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },

    
    
    // {
    //   label: "user Issue Email",
    //   property: "userIssueEmail",
    //   type: "text",
    //   cssClasses: ["text-secondary"],
    //   visible: true,
    // },
    // {
    //   label: "status",
    //   property: "statusStr",
    //   type: "TypeStr",
    //   cssClasses: ["text-secondary"],
    //   visible: true,
    // },
    // {
    //   label: "issue Type",
    //   property: "issueTypeStr",
    //   type: "TypeStr",
    //   cssClasses: ["text-secondary"],
    //   visible: true,
    // },

    { label: "Actions", property: "actions", type: "button", visible: true },
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;
  selection = new SelectionModel<any>(true, []);
  searchCtrl = new FormControl();
  labels;
  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;
  shipmentId: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataTable: any;
  filteredData: any;

  constructor(
    private dialog: MatDialog,

    private activatedRoute: ActivatedRoute,
    private router: Router,
    private PrintOptionsService: PrintOptionsService,
    private spinner: NgxSpinnerService,
    private commonService:CommonService

  ) {}
  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }


  ngOnInit() {
    console.log('print options list');
    this.getPrintOptions();
  }

  getPrintOptions() {
    let params = {
      // IsPaid: true,
      // pageIndex: this.paginator.pageIndex + 1 || 1,
      // pageSize: this.paginator.pageSize || 10,
      orderByProp: this.sort.active || "",
      direction: this.sort.direction || "",
    };
    this.spinner.show();

    this.PrintOptionsService.getPrintOptions(params).subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource();
        this.dataSource = res['data'].list.$values;
        this.filteredData = this.dataSource;
        // this.subject$.next( this.filteredData);
        this.spinner.hide();

      },
      (err) => {}
    );
  }
  ngAfterViewInit() {
    this.dataSource['paginator'] = this.paginator;
    this.dataSource['sort'] = this.sort;
  }

  ViewDetails(issue) {
    this.router.navigateByUrl(`issues/view-details/${issue.issueId}`);
  }

  onDelete(row: any) {
    console.log(row);
    
    this.commonService.openConfirmDialog('Are you sure you want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.deleteUser(row);
        }
      })
  }
  deleteUser(Claim: any) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.PrintOptionsService.deletePrintOptionsById(Claim.id).subscribe(
      (res: any) => {
        this.commonService.openSnackBar('done', 'x')
        this.getPrintOptions();

      },
      (err) => {
        this.commonService.openSnackBarError('error', 'x');
      },
    )
  }

  deleteIssues(Issues: any[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    Issues.forEach((c) => this.deleteUser(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: any) {
    const index = this.Issues.findIndex((c) => c === row);
    //this.Issues[index].labels = change.value;
    this.subject$.next(this.Issues);
  }
  updateClaim(claim) {}
  openCreateEdit(row) {

      this.dialog
        .open(CreateEditComponent, {
          data: row,
        })
        .afterClosed()
        .subscribe((str) => {
          if (str == 'reload') this.getPrintOptions();
        });
    
  
    
  }
  SendMessage(Issue) {
    // this.dialog.open(SendMessageComponent, {
    //   data: Issue
    // }).afterClosed().subscribe((res: any) => {
    //   if (res == "reload") {
    //     this.ngOnInit();
    //   }
    // })
  }

//   convertBase64(dataurl, filename?) {
 
//     var arr = dataurl.split(','),
//         mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]), 
//         n = bstr.length, 
//         u8arr = new Uint8Array(n);
        
//     while(n--){
//         u8arr[n] = bstr.charCodeAt(n);
//     }
    
//     return new File([u8arr], filename, {type:mime});
// }
}
