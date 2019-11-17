export interface ILoginProps {}
export interface ILoginState {
  user: string;
  password: string;
  errorMessage: string;

  showPassword: boolean;
}
