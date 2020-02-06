import { Injectable } from '@angular/core';
import { tasks } from '../mock/mock.db';
import { of, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TaskFaacade {
  public $task = of(tasks);
  public $vm: Observable<any> = combineLatest(this.$task).pipe(
    map(([tasks]) => {
      return { tasks };
    })
  );
  constructor() {}
}
