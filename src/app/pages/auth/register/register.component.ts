import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
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
    // private spinner: NgxSpinnerService,

    // spinner

    
  ) {}

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
  login()
  {
    this.router.navigateByUrl('/auth/login');
  }
  RegisterNewUser() {
    let body = {
        "username":this.form.get('username').value,
        "email": this.form.get('email').value,
        "password":this.form.get('password').value,
        "confirmPassword": this.form.get('confirmPassword').value,
      };
    // this.spinner.show();
    this.AuthService.Register(body).subscribe(
      (response: any) => {
        //let dir = localStorage.getItem("UserLanguage");
      },
      (error: Error) => {
        // this.spinner.hide();
        // this.alertifyService.error('technical error ');
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
