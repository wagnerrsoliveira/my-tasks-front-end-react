import { Task } from "../../models/Task";

export interface ITasksProps {}
export interface ITasksState {
  tasks: Array<Task>;
  task?: Task;
  isEdit: boolean;
  openConfirmation: boolean;
  openFormTask: boolean;
  taskForDelete?: Task;
}
