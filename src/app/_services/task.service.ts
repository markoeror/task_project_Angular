import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '../store/store';

@Injectable({ providedIn: 'root' })
export class TaskService {
  public currentUser =
    localStorage.getItem('currentUser') != null
      ? JSON.parse(localStorage.getItem('currentUser'))
      : undefined;
  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private store: Store
  ) {}

  getTask(user) {
    this.store.set('isLoading', true);
    if (
      this.currentUser &&
      this.currentUser.authorities[0]['authority'] === 'ROLE_ADMIN'
    ) {
      this.http
        .post(`${environment.apiUrl}/api/user/tasksUser`, user)
        .subscribe({
          next: userTasks => {
            this.store.set('tasks', userTasks);
            this.store.set('isLoading', false);
          },
          error: () => this.store.set('isLoading', false)
        });
    }
    if (
      this.currentUser &&
      this.currentUser.authorities[0]['authority'] !== 'ROLE_ADMIN'
    ) {
      this.http
        .post(`${environment.apiUrl}/api/user/tasksAdmin`, user)
        .subscribe({
          next: userTasks => {
            this.store.set('tasks', userTasks);
            this.store.set('isLoading', false);
          },
          error: () => this.store.set('isLoading', false)
        });
    }
  }
}
