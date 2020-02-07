import { Component, OnInit, Input } from '@angular/core';
import { TaskFacade } from '@app/facedes/task.facade';
@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {
  constructor(private facade: TaskFacade) {}

  @Input() columns;
  @Input() rolePermissionAdmin;
  @Input() listOfUsers;
  @Input() tasksStatus;
  @Input() projects;
  @Input() tasks;
  ngOnInit() {
    this.rolePermissionAdmin =
      this.rolePermissionAdmin === 'ROLE_ADMIN' ? true : false;
    console.log('users', this.listOfUsers);
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
}
