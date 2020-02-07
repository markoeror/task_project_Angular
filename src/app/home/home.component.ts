import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, first, skip, takeUntil } from 'rxjs/operators';
import { TaskFacade } from '../facedes/task.facade';
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';
import { Store } from '@app/store/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public projectForm: FormGroup;
  public taskForm: FormGroup;
  public tasks;
  public projects;
  public users;
  public tableColumns;
  public tasksStatus;
  public loading = false;
  public username = '';
  public isAdmin = false;
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
    this.setProjectForm();
    this.setTaskForm();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authorisation = currentUser.authorities[0].authority;
    this.username = currentUser.username;
    this.$vm
      .pipe(skip(2), distinctUntilChanged(), takeUntil(this.$destroy))
      .subscribe({
        next: data => {
          this.projects = data.projects;
          this.showPopUp = data.showPopUp;
          console.log('this.projects', this.projects);
        }
      });

    this.getTasks(currentUser);
    if (authorisation === 'ROLE_ADMIN') {
      this.isAdmin = true;
      this.facade.getProjects();
      this.facade.getUsers();
    } else {
      this.isAdmin = false;
      this.facade.getUsers();
    }
    this.username = currentUser.username;
    this.loading = false;
  }
  setProjectForm() {
    this.projectForm = new FormGroup({
      projectName: new FormControl('')
    });
  }
  setTaskForm() {
    this.taskForm = new FormGroup({
      shortname: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required),
      project: new FormControl('', Validators.required)
    });
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
    const projectName = this.projectForm.value['projectName'];
    this.facade.createProject(projectName);
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
  createProjectTaskPopUp() {
    this.store.set('showPopUp', true);
  }
}
