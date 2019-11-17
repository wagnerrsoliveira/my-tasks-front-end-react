export default class AuthService {
  private url = "http://192.168.10.10/api";

  public static isAuthenticated(): boolean {
    let token = localStorage.getItem("token");
    return token ? true : false;
  }

  public login(email: string, password: string) {
    var myHeaders = new Headers();
    let data = new FormData();
    data.append("email", email);
    data.append("password", password);
    var myInit = {
      method: "POST",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
      body: data
    } as RequestInit;

    var myRequest = new Request(`${this.url}/login`, myInit);

    return fetch(myRequest)
      .then((result: any) => {
        let data = result.json();
        return data;
      })
      .catch((e: any) => {});
  }
}
