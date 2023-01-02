import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { NgxSpinnerService } from "ngx-spinner";
import { ResDTO } from "src/@biostar/Models/res.dto";
import { AuthService } from "src/@biostar/services/auth.service";
import { CommonService } from "src/@biostar/services/common.service";
@Component({
  selector: "vex-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
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
    // private alertifyService : 
    private spinner: NgxSpinnerService,

    // spinner


  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
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

  // toggleVisibility() {
  //   if (this.visible) {
  //     this.inputType = 'password';
  //     this.visible = false;
  //     this.cd.markForCheck();
  //   } else {
  //     this.inputType = 'text';
  //     this.visible = true;
  //     this.cd.markForCheck();
  //   }
  // }

  Register()
  {
    this.router.navigateByUrl('/auth/register');
  }

  login() {
    let body = {
      "account": this.form.get('email').value,
      "password": this.form.get('password').value,
    };

    this.spinner.show();
    this.AuthService.login(body).subscribe(
      (response: ResDTO) => {
        if (!response.isError) {
          var tokendata = JSON.stringify(response.serverParams.Data);
          let user_token = localStorage.setItem('tokendata', tokendata); //response.serverParams.Data.User);
          let app_user = localStorage.setItem('app_user', JSON.stringify(response.serverParams.Data.User));
          let dirToken = localStorage.setItem('id_token', JSON.stringify(response.serverParams.Data.Access_token));
          this.spinner.hide();

          this.commonService.openSnackBar(
            "Login successfully",
            "x"
          );
          this.router.navigateByUrl('/');
        }
        else {
          this.commonService.openSnackBar(
            "Can Not Find this User",
            "x"
          );
        }
      },
      (error: Error) => {
        this.spinner.hide();
        // this.alertifyService.error('technical error ');
        this.commonService.openSnackBarError(
          "technical error ",
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
