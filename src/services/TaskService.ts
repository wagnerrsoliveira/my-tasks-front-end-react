export default class TaskService {
  private url = process.env.REACT_APP_BASEURL;
  private token: string;

  constructor() {
    this.token = `Bearer ${String(localStorage.getItem("token"))}`;
  }

  public getTasks(): Promise<any> {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", this.token);
    var myInit = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default"
    } as RequestInit;

    var myRequest = new Request(`${this.url}/tasks`, myInit);

    return fetch(myRequest)
      .then((result: any) => {
        let data = result.json();
        return data;
      })
      .catch((e: any) => {});
  }
}
