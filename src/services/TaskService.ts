import { ITaskRequest } from "../components/FormTask/types";

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

  public putTask(taskRequest: ITaskRequest): Promise<any> {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", this.token);
    myHeaders.append("Content-Type", "application/json");
    var myInit = {
      method: "PUT",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(taskRequest)
    } as RequestInit;

    var myRequest = new Request(`${this.url}/tasks/${taskRequest.id}`, myInit);

    return fetch(myRequest)
      .then((result: any) => {
        let data = result.json();
        return data;
      })
      .catch((e: any) => {});
  }

  public postTask(taskRequest: ITaskRequest): Promise<any> {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", this.token);
    myHeaders.append("Content-Type", "application/json");
    var myInit = {
      method: "POST",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(taskRequest)
    } as RequestInit;

    var myRequest = new Request(`${this.url}/tasks`, myInit);

    return fetch(myRequest)
      .then((result: any) => {
        let data = result.json();
        return data;
      })
      .catch((e: any) => {});
  }

  public deleteTask(id: number): Promise<any> {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", this.token);
    myHeaders.append("Content-Type", "application/json");
    var myInit = {
      method: "DELETE",
      headers: myHeaders,
      mode: "cors",
      cache: "default"
    } as RequestInit;

    var myRequest = new Request(`${this.url}/tasks/${id}`, myInit);

    return fetch(myRequest)
      .then((result: any) => {
        let data = result.json();
        return data;
      })
      .catch((e: any) => {});
  }
}
