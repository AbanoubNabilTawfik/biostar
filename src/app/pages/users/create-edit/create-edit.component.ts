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
    this.GetGender();
    this.GetGroups();
    this.initForm();
  }
  GetGender() {
    this.spinner.show();

    this.UsersService.GetGender().subscribe(
      (res) => {
        this.genders = res["data"].list.$values;
        this.spinner.hide();
      },
      (err) => {}
    );
  }
  GetGroups() {
    this.spinner.show();

    this.UsersService.GetGroups().subscribe(
      (res) => {
        this.groups = res["data"].list.$values;

        this.spinner.hide();
      },
      (err) => {}
    );
  }

  initForm() {
    this.Form = this.fb.group({
      gender: ["", this.defaults == null ? [Validators.required] : []],
      title: ["", this.defaults == null ? [Validators.required] : []],
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
      department: [1, this.defaults == null ? [Validators.required] : []],
      user_title: [" ", this.defaults == null ? [Validators.required] : []],
    });
    if (this.defaults !== null) {
      this.Form.get("title").patchValue(this.defaults?.title);
      this.Form.get("name").patchValue(this.defaults?.name);
      this.Form.get("email").patchValue(this.defaults?.email);
      this.Form.get("phone").patchValue(this.defaults?.phone);
      this.Form.get("user_id").patchValue(this.defaults?.user_id);
      this.Form.get("user_group_id").patchValue(this.defaults?.user_group_id);
      this.Form.get("start_datetime").patchValue(
        new Date(this.defaults?.start_datetime)
      );
      this.Form.get("expiry_datetime").patchValue(
        new Date(this.defaults?.expiry_datetime)
      );
      this.Form.get("user_ip").patchValue(this.defaults?.user_ip);
      this.Form.get("department").patchValue(this.defaults?.department);
      this.Form.get("user_title").patchValue(this.defaults?.user_title);
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
  }
  submit() {
    const formData: FormData = new FormData();

    if (this.defaults == null) {
      formData.append("gender", this.Form.controls["gender"].value.toString());
      formData.append("title", this.Form.controls["title"].value.toString());
      formData.append(
        "department",
        this.Form.controls["department"].value.toString()
      );
      formData.append(
        "user_title",
        this.Form.controls["user_title"].value.toString()
      );
    }
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

    this.spinner.show();
    if(this.defaults == null){ 
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
    else{

      this.UsersService.updateUserById(this.defaults.useru_id ,formData).subscribe(
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
}
