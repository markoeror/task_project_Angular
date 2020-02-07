import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TaskFacade } from '@app/facedes/task.facade';
import { skip, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit, OnDestroy {
  constructor(private facade: TaskFacade) {}
  private $destroy = new Subject();
  public columns;
  public rolePermissionAdmin;
  public listOfUsers;
  public users;
  public tasksStatus;
  public projects;
  public tasks;
  public $vm = this.facade.$vm;
  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authorisation = currentUser.authorities[0].authority;
    this.rolePermissionAdmin = authorisation === 'ROLE_ADMIN' ? true : false;
    this.$vm
      .pipe(skip(2), distinctUntilChanged(), takeUntil(this.$destroy))
      .subscribe({
        next: data => {
          this.users = [];
          this.projects = [];
          this.tasks = data.tasks;
          this.listOfUsers = data.listOfUsers;
          this.columns = data.tableColumns;
          this.tasksStatus = data.tasksStatus;
          this.listOfUsers.map(user => {
            this.users.push({
              label: user.username,
              value: user.username
            });
          });
          data.projects.map(project => {
            this.projects.push({
              label: project.username,
              value: project.username
            });
          });
        }
      });
  }

  onRowEditSave(rowData) {
    this.facade.setTask(rowData);
  }
  onRowEditInit(rowData) {}
  onRowEditCancel(rowData, ri) {}
  setTask(data: any) {}

  deleteTask(data) {
    this.facade.deleteTasks(data);
  }
  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
