import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Patterns } from "src/@biostar/Constrants/Patterns";
import { SharedService } from "src/@biostar/services/shared.service";
import { UsersService } from "src/@biostar/services/users.service";

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
  genders: void;
  groups: any;
  constructor(
    private fb: FormBuilder,
    public SharedService: SharedService,
    private router: Router,
    private UsersService: UsersService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<CreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public defaults: any
  ) {}

  ngOnInit(): void {
    console.log("users create");
    this.GetGender();
    this.GetGroups();
    this.initForm();
  }
  GetGender() {
    this.spinner.show();

    this.UsersService.GetGender().subscribe(
      (res) => {
        this.genders =res['data'].list.$values;
        this.spinner.hide();
      },
      (err) => {}
    );
  }
  GetGroups() {
    this.spinner.show();

    this.UsersService.GetGroups().subscribe(
      (res) => {
        this.groups =res['data'].list.$values;

        this.spinner.hide();
      },
      (err) => {}
    );
  }

  initForm() {
    this.Form = this.fb.group({
      gender: ["", [Validators.required]],
      title: [
        "",
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
          // Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      name: [
        "",
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
          // Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],

      phone: [
        "",
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
          // Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      user_id: [
        "0001",
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
          // Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      user_group_id: [
        0,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
          // Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      start_datetime: ["", [Validators.required]],
      expiry_datetime: [
        "",
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
          // Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      user_ip: [
        1,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
          // Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      department: [
        1,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
          // Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      user_title: [
        " ",
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
  }
  submit() {
    const formData: FormData = new FormData();

    formData.append("gender", this.Form.controls["gender"].value.toString());
    formData.append("title", this.Form.controls["title"].value.toString());
    formData.append("name", this.Form.controls["name"].value.toString());
    formData.append("email", this.Form.controls["email"].value.toString());

    if (this.newsImgB64 !== undefined) {
      formData.append("photo", this.newsImgB64, this.newsImgB64.name);
    }

    formData.append("phone", this.Form.controls["phone"].value.toString());
    formData.append("user_id", this.Form.controls["user_id"].value.toString());
    formData.append("user_group_id", this.Form.controls["user_group_id"].value);
    formData.append(
      "start_datetime",
      new Date(
        this.Form.controls["start_datetime"].value.toString()
      ).toDateString()
    );
    formData.append(
      "expiry_datetime",
      new Date(this.Form.controls["expiry_datetime"].value).toDateString()
    );
    formData.append("user_ip", this.Form.controls["user_ip"].value.toString());
    // formData.append('ShortAddress', this.Form.controls['priceType'].value.toString());
    formData.append(
      "department",
      this.Form.controls["department"].value.toString()
    );
    formData.append(
      "user_title",
      this.Form.controls["user_title"].value.toString()
    );
    console.log(formData);

    console.log(this.Form);

    this.spinner.show();

    this.UsersService.setUsers(formData).subscribe(
      (response: any) => {
          this.dialogRef.close("reload");
          // this.alertifyService.success(response.message);

       
      },
      (error: Error) => {
        this.spinner.hide();
        // this.alertifyService.error('technical error ');
      }
    );
  }
}
