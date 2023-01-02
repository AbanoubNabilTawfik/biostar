import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "src/@biostar/services/auth.service";
import { CommonService } from "src/@biostar/services/common.service";
@Component({
  selector: "vex-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  inputType = "password";
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private AuthService: AuthService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,

    // spinner


  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
  }


  send() {
    this.router.navigate(["/"]);
    this.snackbar.open(
      "Lucky you! Looks like you didn't need a password or email address! For a real application we provide validators to prevent this. ;)",
      "LOL THANKS",
      {
        duration: 10000,
      }
    );
  }


  login() {
    this.router.navigateByUrl('/auth/login');
  }
  RegisterNewUser() {
    let body = {
      "username": this.form.get('username').value,
      "email": this.form.get('email').value,
      "password": this.form.get('password').value,
      "confirmPassword": this.form.get('confirmPassword').value,
    };
    this.spinner.show();
    console.log(body);

    this.AuthService.Register(body).subscribe(
      (response: any) => {
        if (!response.isError) {
          this.commonService.openSnackBar(
            response.message,
            "x"
          );
          this.spinner.hide();
          this.router.navigate(["/"]);
        }
        else {
          this.spinner.hide();
          this.commonService.openSnackBarError(
            response.message,
            "x"
          );
        }
      },
      (error: Error) => {
        this.spinner.hide();
        this.commonService.openSnackBarError(
          'error in create user',
          "x"
        );
      }
    );
  }
  dir() {
    //
    let dir = localStorage.getItem("UserLanguage");
    //
    return dir;
  }
}
