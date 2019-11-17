export interface Task {
  name: string;
  description: string;
  status: EStatusTask;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null | Date;
}

export enum EStatusTask {
  CREATED,
  DOING,
  CANCEL,
  DONE
}
