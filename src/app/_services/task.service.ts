import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EmployeeMappingStore } from '../store/store';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient, private store: EmployeeMappingStore) {
  }


  setTask(username: any) {
    const data = {
      username
    };
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authorisation = currentUser.authorities[0].authority;
    let address = '';
    if (authorisation === 'ROLE_ADMIN') {
      address = (`${environment.apiUrl}/api/user/updateTaskAdmin`);
    } else {
      address = (`${environment.apiUrl}/api/user/updateTaskUser`);
    }
    return this.http.post(address, data).pipe(map(jsonData =>
      this.store.set('tasks', jsonData)
    ))
      ;
  }

  getProjects() {
    const address = (`${environment.apiUrl}/api/user/projects`);
    return this.http.get(address).pipe(map(jsonData =>
      this.store.set('projects', jsonData)
    ));
  }

  deleteTask(id) {
    const address = (`${environment.apiUrl}/api/user/deleteTask${id}`);
    return this.http.get(address).pipe(map(jsonData =>
      this.store.set('tasks', jsonData)
    ));
  }

  createProject(data) {
    const project = {
      data
    };
    const address = (`${environment.apiUrl}/api/user/admin/project`);
    return this.http.post(address, project).pipe(map(jsonData =>
      this.store.set('projects', jsonData)
    ));
  }
}
