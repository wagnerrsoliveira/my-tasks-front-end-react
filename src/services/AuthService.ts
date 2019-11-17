export default class AuthService {
  private url = process.env.REACT_APP_BASEURL;

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

  public getDetail(token: string): Promise<any> {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var myInit = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default"
    } as RequestInit;

    var myRequest = new Request(`${this.url}/details`, myInit);

    return fetch(myRequest)
      .then((result: any) => {
        let data = result.json();
        return data;
      })
      .catch((e: any) => {});
  }
}
