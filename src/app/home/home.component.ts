import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, first, skip, takeUntil } from 'rxjs/operators';
import { TaskFacade } from '../facedes/task.facade';
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
  public tasks;
  public projects;
  public users;
  public tableColumns;
  public tasksStatus;
  public loading = false;
  public username = '';
  public $vm = this.facade.$vm;
  private $destroy = new Subject();

  constructor(private userService: UserService, private facade: TaskFacade) {}

  ngOnInit() {
    this.loading = true;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authorisation = currentUser.authorities[0].authority;
    this.username = currentUser.username;
    this.$vm
      .pipe(skip(2), distinctUntilChanged(), takeUntil(this.$destroy))
      .subscribe({
        next: data => {
          console.log(data.listOfUsers);
          this.tasks = data.tasks;
          this.projects = data.projects;
          this.users = data.listOfUsers;
          this.tableColumns = data.tableColumns;
          this.tasksStatus = data.tasksStatus;
        }
      });

    this.getTasks(currentUser.username);
    if (authorisation === 'ROLE_ADMIN') {
      console.log('authorisation', authorisation);
      this.facade.getProjects();
      this.facade.getUsers();
    }
    this.username = currentUser.username;
    this.loading = false;
  }

  getTasks(user) {
    this.facade.getTasks(user);
  }

  setTask(data) {
    this.facade.setTask(data);
  }

  deleteTask(data) {
    this.facade.setTask(data);
  }

  createProject(data) {
    this.facade.createProject(data);
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
