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

    {
      label: "issue Created Date",
      property: "issueCreatedDate",
      type: "date",
      cssClasses: ["font-medium"],
      visible: true,
    },
    {
      label: "message",
      property: "message",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "user Issue Email",
      property: "userIssueEmail",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "status",
      property: "statusStr",
      type: "TypeStr",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "issue Type",
      property: "issueTypeStr",
      type: "TypeStr",
      cssClasses: ["text-secondary"],
      visible: true,
    },

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

  constructor(
    private dialog: MatDialog,

    private activatedRoute: ActivatedRoute,
    private router: Router,
    private UsersService: UsersService
  ) {}
  GetShipmentID() {}
  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  // getData() {
  //   return of(aioTableData.map(Claim => Claim));
  // }
  ViewTable() {
    let params = {
      // IsPaid: true,
      // pageIndex: this.paginator.pageIndex + 1 || 1,
      // pageSize: this.paginator.pageSize || 10,
      orderByProp: this.sort.active || "",
      direction: this.sort.direction || "",
    };
    this.GetShipmentID();

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<any[]>(Boolean)).subscribe((Issues) => {
      this.Issues = Issues;
      this.dataSource.data = Issues;
    });

    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));
  }
  ngOnInit() {
    this.ViewTable();
    this.getUsers();
  }

  getUsers() {
    let params = {
      // IsPaid: true,
      // pageIndex: this.paginator.pageIndex + 1 || 1,
      // pageSize: this.paginator.pageSize || 10,
      orderByProp: this.sort.active || "",
      direction: this.sort.direction || "",
    };
    this.UsersService.getUsers(params).subscribe(
      (res) => {},
      (err) => {}
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ViewDetails(issue) {
    this.router.navigateByUrl(`issues/view-details/${issue.issueId}`);
  }

  onDelete(Claim: any) {
    // this.commonService.openConfirmDialog('Are you sure you want to delete this record ?')
    //   .afterClosed().subscribe(res => {
    //     if (res) {
    //       this.deleteClaim(Claim);
    //     }
    //   });
  }
  deleteClaim(Claim: any) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    // this.LoadOwnerShipmentIssueservice.RemoveClaim(Claim.id).subscribe(
    //   (res: ResponseDTO) => {
    //     if (res.isError == false) {
    //       this.commonService.openSnackBar(res.serverParams['Message'], 'x')
    //       this.ViewTable();
    //     }
    //     else {
    //
    //       this.commonService.openSnackBarError(res.errorMessage, 'x');
    //     }
    //   },
    //   (err) => {
    //   },
    // )
  }

  deleteIssues(Issues: any[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    Issues.forEach((c) => this.deleteClaim(c));
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
  AddIssue() {
    window.open("issues/create/0", "_blank");
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
}
