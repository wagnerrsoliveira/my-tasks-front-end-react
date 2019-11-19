import { Task } from "../../models/Task";

export interface IFormTaskProps {
  open: boolean;
  isEdit: boolean;
  task?: Task;
  handleOnClickSubmit: (isEdit: boolean, task?: ITaskRequest) => void;
  width: any;
}

export interface ITaskRequest {
  id: number;
  name: string;
  description: string;
  status: number;
}

export interface IFormTaskState {
  name: string;
  nameError: string;
  description: string;
  descriptionError: string;
  status: number;
}
