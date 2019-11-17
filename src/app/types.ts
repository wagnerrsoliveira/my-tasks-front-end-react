import { EMessage } from "../components/Message/types";

export interface IAppProps {}
export interface IAppState {
  loading: boolean;
  isAuthenticated: boolean;
  message: string;
  openMessage: boolean;
  typeMessage: EMessage;
}
