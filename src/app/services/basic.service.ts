import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable, throwError } from "rxjs";

export class BasicService {
  private urlBase: string;
  private baseResource: string;
  private baseHttp: HttpClient;

  constructor(urlBase: string, baseResource: string, http: HttpClient) {
    this.urlBase = urlBase;
    this.baseResource = baseResource;
    this.baseHttp = http;
  }

  getHttp(): HttpClient {
    return this.baseHttp;
  }

  getServerAPI(): string {
    return `${this.urlBase}/${this.baseResource}`;
  }

  getResource(): string {
    return this.baseResource;
  }

  getHttpHeaderOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return { headers: httpOptions.headers };
  }

  httpGet(uri: string): Observable<any> {
    const options = this.getHttpHeaderOptions();
    return this.baseHttp.get(`${environment.apiUrl}${uri}`, options);
  }

  public errorHandl(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
