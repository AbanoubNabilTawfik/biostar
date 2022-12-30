import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Patterns } from "src/@biostar/Constrants/Patterns";
import { SharedService } from "src/@biostar/services/shared.service";
import { PrintOptionsService } from "src/@biostar/services/PrintOptions.service";
import { CommonService } from "src/@biostar/services/common.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "vex-create-edit",
  templateUrl: "./create-edit.component.html",
  styleUrls: ["./create-edit.component.scss"],
})
export class CreateEditComponent implements OnInit {
  Form: FormGroup;
  imgAsBinary: any;
  imagePath: any;
  newsImgB64: any;
  imgName: any;
  imgURL: any = "";
  maxDate = new Date();
  minDate = new Date();
  CardWidth: any;
  CardHeight: any;
  FontStyle: any;
  FontSize: any;
  FontColor: any;
  FontFamily: any;
  formatedImage: any;
  IsBack: any;
  IsActive:any;
  constructor(
    private fb: FormBuilder,
    public SharedService: SharedService,
    private router: Router,
    private PrintOptionsService: PrintOptionsService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<CreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private commonService: CommonService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  displayBase64(url) {
    let result: any = this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${url}`
    );
    return result;
  }

  initForm() {
    this.Form = this.fb.group({
      BackgroundPic: ["", [Validators.required]],
      FontColor: [
        "#000000",
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
          // Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],

      FontSize: [
        1,
        [
          // Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
          // Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      FontStyle: ["normal", [Validators.required]],

      CardWidth: [
        1,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
          // Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      CardHight: [
        1,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
          // Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      IsBack: [false, [Validators.required]],
      IsActive:[false],
      fontFamily:[null]
    });

    this.initFormInEdit();
  }
  initFormInEdit() {
    if (this.defaults !== null) {
      this.CardWidth = this.defaults.cardWidth;
      this.CardHeight = this.defaults.cardHight;
      this.FontStyle = this.defaults.fontStyle;
      this.FontSize = this.defaults.fontSize;
      this.FontColor = this.defaults.fontColor;
      this.IsBack = this.defaults.isBack;
      this.IsActive= this.defaults.isActive 
      this.Form.get("IsBack").patchValue(this.defaults.isBack);
      setTimeout(() => {
        this.imgURL = this.displayBase64(this.defaults.backgroundPic);
      }, 1000);
    }
  }
  preview(files: any) {
    if (files.length === 0) return;
    this.imgAsBinary = files[0];
    let mimeType = files[0].type;
    let reader = new FileReader();
    this.imagePath = files;
    this.newsImgB64 = files[0];

    this.imgName = files[0].name;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      let imgBase6 = (reader.result as string).substr(
        (reader.result as string).indexOf(",") + 1
      );
      // this.newsImgB64 = imgBase6;
    };
    // this.displayBase64()
  }

  submit() {
    const formData: FormData = new FormData();
    if (this.newsImgB64 !== undefined) {
      formData.append("BackgroundPic", this.newsImgB64, this.newsImgB64.name);
    }
    if (this.defaults !== null) {
      formData.append("Id", this.defaults.id);
    }
    formData.append(
      "FontColor",

      this.Form.controls["FontColor"].value == undefined
        ? "#000000"
        : this.Form.controls["FontColor"].value.toString()
    );
    if (this.Form.controls["FontSize"].value !== undefined) {
      formData.append(
        "FontSize",
        this.Form.controls["FontSize"].value.toString()
      );
    }
    formData.append(
      "FontStyle",
      this.Form.controls["FontStyle"].value.toString()
    );
    formData.append(
      "CardWidth",
      this.Form.controls["CardWidth"].value.toString()
    );
    formData.append(
      "CardHight",
      this.Form.controls["CardHight"].value.toString()
    );
    formData.append("IsBack", this.Form.controls["IsBack"].value.toString());
    //formData.append("isActive", this.Form.controls["isActive"].value.toString());
    this.spinner.show();

    if (this.defaults == null) {
      this.PrintOptionsService.setPrintOptions(formData).subscribe(
        (response: any) => {
          this.dialogRef.close("reload");
          this.commonService.openSnackBar(
            "you are set your options successfully",
            "x"
          );
        },
        (error: Error) => {
          this.spinner.hide();
          this.commonService.openSnackBarError("error in set options", "x");
        }
      );
    } else {
      this.PrintOptionsService.updatePrintOptionsById(
        this.defaults.id,
        formData
      ).subscribe(
        (response: any) => {
          this.dialogRef.close("reload");
          this.commonService.openSnackBar(
            "you are set your options successfully",
            "x"
          );
        },
        (error: Error) => {
          this.spinner.hide();
          this.commonService.openSnackBarError("error in set options", "x");
        }
      );
    }
  }

  onSelectFontFamily(){
    console.log(this.FontFamily);
    
  }
}
