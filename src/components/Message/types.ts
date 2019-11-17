export interface IMessageProps {
  message: string;
  type: EMessage;
  open: boolean;
  handleCloseMessage: () => void;
}
export interface IMessageState {}

export enum EMessage {
  error,
  info,
  success,
  warning
}
