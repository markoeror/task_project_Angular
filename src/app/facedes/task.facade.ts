import { Injectable } from '@angular/core';
import { of, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService } from '@app/_services/task.service';
import { Store } from '@app/store/store';

@Injectable({ providedIn: 'root' })
export class TaskFacade {
  public $vm: Observable<any> = combineLatest(
    this.store.select('tasks'),
    this.store.select('projects'),
    this.store.select('listOfUsers'),
    this.store.select('tableColumns'),
    this.store.select('tasksStatus'),
    this.store.select('showPopUp')
  ).pipe(
    map(
      ([
        tasks,
        projects,
        listOfUsers,
        tableColumns,
        tasksStatus,
        showPopUp
      ]) => {
        return {
          tasks,
          projects,
          listOfUsers,
          tableColumns,
          tasksStatus,
          showPopUp
        };
      }
    )
  );

  constructor(private taskService: TaskService, private store: Store) {}

  createTaskAddToProject(task, project) {
    this.taskService.createTask(task, project);
  }
  deleteTasks(user) {
    this.taskService.deleteTask(user).subscribe({
      next: dataFromApi => {
        console.log('deleteTasks dataFromApi', dataFromApi);
        this.store.set('tasks', dataFromApi);
        this.store.set('isLoading', false);
      },
      error: () => this.store.set('isLoading', false)
    });
  }
  getTasks(user) {
    this.taskService.getTasks(user).subscribe({
      next: dataFromApi => {
        console.log('dataFromApi', dataFromApi);
        this.store.set('tasks', dataFromApi);
        this.store.set('isLoading', false);
      },
      error: () => this.store.set('isLoading', false)
    });
  }

  setTask(data: any) {
    this.taskService.setTask(data).subscribe({
      next: dataFromApi => {
        console.log('setTask dataFromApi', dataFromApi);
        this.store.set('tasks', dataFromApi);
        this.store.set('isLoading', false);
      },
      error: () => this.store.set('isLoading', false)
    });
  }

  getProjects() {
    this.taskService.getProjects().subscribe({
      next: dataFromApi => {
        console.log('dataFromApi', dataFromApi);
        this.store.set('projects', dataFromApi);
        this.store.set('isLoading', false);
      },
      error: () => this.store.set('isLoading', false)
    });
  }

  createProject(data: any) {
    this.taskService.createProject(data);
  }
  getUsers() {
    this.taskService.getUsers().subscribe({
      next: dataFromApi => {
        console.log('getUsersdataFromApi', dataFromApi);
        this.store.set('listOfUsers', dataFromApi);
        this.store.set('isLoading', false);
      },
      error: () => this.store.set('isLoading', false)
    });
  }
}
