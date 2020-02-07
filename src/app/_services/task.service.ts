import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Store } from '../store/store';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient, private store: Store) {}

  public currentUser = JSON.parse(localStorage.getItem('currentUser'));

  setTask(data: any) {
    console.log('');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authorisation = currentUser.authorities[0].authority;
    let address = '';
    if (authorisation === 'ROLE_ADMIN') {
      address = `${environment.apiUrl}/api/user/updateTaskAdmin`;
    } else {
      address = `${environment.apiUrl}/api/user/updateTaskUser`;
    }
    console.log('data', data);
    console.log('adress', address);

    return this.http.post(address, data).pipe(map(jsonData => jsonData));
  }

  getProjects() {
    const address = `${environment.apiUrl}/api/user/projects`;
    return this.http.get(address).pipe(map(jsonData => jsonData));
  }

  getUsers() {
    const address = `${environment.apiUrl}/api/user/getAllUsers`;
    return this.http.get(address).pipe(map(jsonData => jsonData));
  }

  deleteTask(task) {
    const id = task.id;
    const address = `${environment.apiUrl}/api/user/deleteTask/${id}`;
    return this.http.get(address).pipe(map(jsonData => jsonData));
  }

  createProject(data) {
    console.log('createProject0', data);

    const project = {
      projectName: data
    };
    const address = `${environment.apiUrl}/api/user/admin/project`;
    return this.http.post(address, project).pipe(map(jsonData => jsonData));
  }

  getTasks(user) {
    console.log('user', user);

    this.store.set('isLoading', true);
    const body = { username: user.username };
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authorisation = currentUser.authorities[0].authority;
    let address = '';
    if (authorisation === 'ROLE_ADMIN') {
      address = `${environment.apiUrl}/api/user/tasksAdmin`;
      console.log(address);
    } else {
      address = `${environment.apiUrl}/api/user/tasksUser`;
    }
    return this.http.post(address, body).pipe(map(jsonData => jsonData));
  }

  createTask(task: any, projectId: any) {
    const address = `${environment.apiUrl}/api/user/createTaskAndAddToProject/${projectId}`;
    return this.http.post(address, task).pipe(map(jsonData => jsonData));
  }
}
