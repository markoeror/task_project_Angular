export interface Task {
  id: number;
  taskStatus: string; // edit
  deadline: string; // edit
  description: string;
  shortname: string; //admin can edit
  projectName: string;
  usersName: string; // admin change username with dropdown;
  userId: number;
}

export interface State {
  user: {};
  isLoading: boolean;
  projects: Array<Task>;
  tasks: Array<any>;
  tableColumns: Array<any>;
  tasksStatus: Array<any>;
  listOfUsers: Array<any>;
}

export class AppState implements State {
  user: {} =
    localStorage.getItem('currentUser') != null
      ? JSON.parse(localStorage.getItem('currentUser'))
      : {};
  isLoading = false;
  projects = [];
  tasks = [];
  listOfUsers = [];
  tasksStatus = [
    {
      label: 'New',
      value: 'NEW'
    },
    {
      label: 'In Progress',
      value: 'IN_PROGRESS'
    },
    {
      label: 'FINISHED',
      value: 'Finished'
    }
  ];
  tableColumns = [
    {
      field: 'id',
      header: 'id'
    },
    {
      field: 'taskStatus',
      header: 'Task Status'
    },
    {
      field: 'deadline',
      header: 'Dead Line'
    },
    {
      field: 'description',
      header: 'Description'
    },
    {
      field: 'shortname',
      header: 'Short Name'
    },
    {
      field: 'projectName',
      header: 'Project Name'
    },
    {
      field: 'usersName',
      header: 'User Name'
    },
    {
      field: 'User Id',
      header: 'User Id'
    }
  ];
}
