import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { PrintOptionsService } from "src/@biostar/services/PrintOptions.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "vex-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  CardWidth: any;
  CardHeight: any;
  FontStyle: any;
  FontSize: any;
  FontColor: any;
  imgURL: any;
  options: any;
  constructor(
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private sanitizer: DomSanitizer
  ) {}

  cards: any = [];
  ngOnInit(): void {
    console.log(this.defaults.row);
    this.cards = this.defaults;
    if (this.cards.length == 1) {
      console.log("one ele");
      this.cards = [this.defaults.row];
    } else {
      console.log("more than one ele");
      this.cards = this.defaults.row;
    }
    // console.log(this.cards ,this.defaults.row[0]);
  }
  displayBase64(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${url}`
    );
  }
  printUser() {
    var mywindow = window.open("", "PRINT", "height=400,width=600");

    mywindow.document.write(
      "<html><head><title>" + document.title + "</title>"
    );
    mywindow.document.write("</head><body >");
    mywindow.document.write("<h1>" + document.title + "</h1>");

    mywindow.document.write(document.getElementById("print-sec").innerHTML);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    // // mywindow.close();

    // window.print();
    return true;
  }
}
