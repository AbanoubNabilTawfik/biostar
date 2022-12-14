import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { PrintOptionsService } from "src/@biostar/services/PrintOptions.service";
import { DomSanitizer } from "@angular/platform-browser";
import { style } from "@angular/animations";

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
    this.cards = this.defaults;
    if (this.cards.length == 1) {
      this.cards = [this.defaults.row];
    } else {
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
    var mywindow = window.open("", "PRINT", "");

    mywindow.document.write(
      "<html><head><title>" + document.title + "</title>"
    );
    mywindow.document.write('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap">');
    mywindow.document.write('<link rel="stylesheet" href="../../../assets/theme/external-window.css">');
    mywindow.document.write('<link rel="stylesheet" href="../../../assets/theme/external-window.css">');
    mywindow.document.write('<link rel="stylesheet" href="../../../assets/fonts/Apercu/ApercuProRegular.otf">');

    mywindow.document.write("</head><body >");
    // mywindow.document.write("<h1>" + document.title + "</h1>");
    // mywindow.document.write(style(margin:'0'))
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
