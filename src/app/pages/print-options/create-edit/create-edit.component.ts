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
  imgURL: string | ArrayBuffer = "";
  maxDate = new Date();
  minDate = new Date();
  CardWidth:any
  CardHeight:any
  FontStyle:any
  FontSize:any
  FontColor:any
  formatedImage:any
 constructor(
    private fb: FormBuilder,
    public SharedService: SharedService,
    private router: Router,
    private PrintOptionsService: PrintOptionsService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<CreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private commonService:CommonService,
    private sanitizer: DomSanitizer

  ) {}

  ngOnInit(): void {
    console.log('print options create');
    
    this.initForm();
  }
  // displayBase64(){
    
  //   this.formatedImage =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.imgURL}`);
  //   console.log(this.formatedImage );
    
  //   return this.formatedImage
  // }

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
    });
  }
  preview(files: any) {
    // console.log(files)
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
    console.log(this.Form);
    
    const formData: FormData = new FormData();

    if (this.newsImgB64 !== undefined) {
      formData.append("BackgroundPic", this.newsImgB64, this.newsImgB64.name);
    }
    formData.append(
      "FontColor",
      this.Form.controls["FontColor"].value.toString()
    );
    formData.append(
      "FontSize",
      this.Form.controls["FontSize"].value.toString()
    );
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

    console.log(formData);

    console.log(this.Form);

    this.spinner.show();

    this.PrintOptionsService.setPrintOptions(formData).subscribe(
      (response: any) => {
          this.dialogRef.close("reload");
          this.commonService.openSnackBar('you are set your options successfully', 'x')

   
      },
      (error: Error) => {
        this.spinner.hide();
        this.commonService.openSnackBarError('error in set options', 'x')

      }
    );
  }
}
