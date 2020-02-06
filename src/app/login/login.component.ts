import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { first } from "rxjs/operators";

import { AuthenticationService } from "@app/_services";

@Component({ templateUrl: "login.component.html" })
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  loginForm: FormGroup;
  loading = false;
  logInsubmitted = false;
  signInsubmitted = false;
  returnUrl: string;
  error = "";
  toShowSignin = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.setLoginForm();
    this.setSignInForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // convenience getter for easy access to form fields
  get loginF() {
    return this.loginForm.controls;
  }
  get signinF() {
    return this.signInForm.controls;
  }
  setLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }
  setSignInForm() {
    this.signInForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
      name: new FormControl("", [Validators.required]),
      surname: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }
  login() {
    this.logInsubmitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService
      .login(this.loginF.username.value, this.loginF.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.loginForm.reset();
          this.logInsubmitted = false;
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
  signin() {
    this.signInsubmitted = true;
    // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService
      .signin(
        this.signinF.username.value,
        this.signinF.password.value,
        this.signinF.name.value,
        this.signinF.surname.value,
        this.signinF.email.value
      )
      .pipe(first())
      .subscribe(
        data => {
          console.log("data", data);
          this.toShowSignin = true;
          this.loading = false;
          this.signInForm.reset();
          this.signInsubmitted = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
  showSignin() {
    this.toShowSignin = !this.toShowSignin;
  }
}
