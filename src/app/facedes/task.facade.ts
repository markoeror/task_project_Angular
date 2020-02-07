import { Injectable } from '@angular/core';
import { tasks } from '../mock/mock.db';
import { of, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService } from '@app/_services/task.service';

@Injectable({ providedIn: 'root' })
export class TaskFacade {
  public $task = of(tasks);
  public $vm: Observable<any> = combineLatest(this.$task).pipe(
    // tslint:disable-next-line:no-shadowed-variable
    map(([tasks]) => {
      return { tasks };
    })
  );

  constructor(private taskService: TaskService) {
  }


  setTask(data: any) {
    this.taskService.setTask(data);
  }

  getProjects() {
    this.taskService.getProjects();
  }

  createProject(data: any) {
    this.taskService.createProject(data);
  }
}
