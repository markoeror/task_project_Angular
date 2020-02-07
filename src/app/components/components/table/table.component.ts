import { Component, OnInit, Input } from '@angular/core';
import {TaskFacade} from '@app/facedes/task.facade';
@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {
  constructor(private facade: TaskFacade) {}
  @Input() data = [];
  @Input() columns = [];
  @Input() rolePermissionAdmin;
  @Input() listOfUsers = [];
  @Input() tasksStatus = [];

  ngOnInit() {
    this.rolePermissionAdmin =
      this.rolePermissionAdmin === 'ROLE_ADMIN' ? true : false;

  }

  onRowEditSave(rowData) {
    console.log('save!!!');
  }
  onRowEditInit(rowData) {
    console.log('init!!');
  }
  onRowEditCancel(rowData, ri) {
    console.log('cancel!!!');
  }
  setTask(data: any) {
    this.facade.setTask(data);
}
}
