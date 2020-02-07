import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, first, skip, takeUntil } from 'rxjs/operators';
import { TaskFacade } from '../facedes/task.facade';
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';
import { Store } from '@app/store/store';
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
  public showProjectPopUp = false;
  public showPopUp = false;
  constructor(
    private userService: UserService,
    private facade: TaskFacade,
    private store: Store
  ) {}

  ngOnInit() {
    this.loading = true;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authorisation = currentUser.authorities[0].authority;
    this.username = currentUser.username;
    this.$vm
      .pipe(skip(2), distinctUntilChanged(), takeUntil(this.$destroy))
      .subscribe({
        next: data => {
          this.showPopUp = data.showPopUp;
        }
      });

    this.getTasks(currentUser);
    if (authorisation === 'ROLE_ADMIN') {
      this.facade.getProjects();
      this.facade.getUsers();
    } else {
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
  createProjectTaskPopUp() {
    this.store.set('showPopUp', true);
  }
}
