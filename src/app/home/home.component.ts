import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { TaskFacade } from '../facedes/task.facade';
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { environment } from '@environments/environment';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  public loading = false;
  public username = '';

  constructor(private userService: UserService, private facade: TaskFacade) {
  }

  ngOnInit() {
    this.loading = true;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authorisation = currentUser.authorities[0].authority;
    if (authorisation === 'ROLE_ADMIN') {
      this.getProjects();
    }

    this.username = currentUser.username;
    this.loading = false;

  }

  setTask(data) {
    this.facade.setTask(data);
  }

  getProjects() {
    this.facade.getProjects();
  }

  deleteTask(data) {
    this.facade.setTask(data);
  }
  createProject(data) {
    this.facade.createProject(data);
  }
}
