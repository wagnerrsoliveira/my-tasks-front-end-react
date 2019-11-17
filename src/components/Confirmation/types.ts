import { Task } from "../../models/Task";

export interface IConfirmationProps {
  open: boolean;
  task?: Task;
  handleOnClickConfirmation: (confirm: boolean, task?: Task) => void;
}
