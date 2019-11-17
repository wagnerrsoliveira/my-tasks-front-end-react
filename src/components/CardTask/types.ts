import { Task } from "../../models/Task";

export interface ICardTaskProps {
  task: Task;
  handleOnClickEditar: (task: Task) => void;
  handleOnClickExcluir: (task: Task) => void;
}
export interface ICardTaskState {}
