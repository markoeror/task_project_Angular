import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { AppState } from './state';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class EmployeeMappingStore {
  public defaultState = new AppState();
  private subject = new BehaviorSubject(this.defaultState);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());
  get value() {
    return this.subject.getValue();
  }

  select(name: string): Observable<any> {
    return this.store.pipe(pluck(name));
  }
  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state
    });
  }
}
