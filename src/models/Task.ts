export interface Task {
  name: string;
  description: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
}
