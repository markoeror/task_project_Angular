import { Component } from "@angular/core";
import { first } from "rxjs/operators";

import { User } from "@app/_models";
import { UserService, AuthenticationService } from "@app/_services";

@Component({ templateUrl: "home.component.html" })
export class HomeComponent {
  public loading = false;
  public username = "";

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loading = true;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.username = currentUser.username;
    this.loading = false;
  }
}
