import { Component, OnInit } from '@angular/core';
import { tasks } from '../../mock/mock.db';

@Component({
  selector: 'app-test',
  templateUrl: 'test.component.html'
})
export class TestComponent implements OnInit {
  constructor() {}
  public tasks = tasks;
  ngOnInit() {}
}
