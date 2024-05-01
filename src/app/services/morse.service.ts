import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MorseService {

  constructor(
    private _http: HttpClient
  ) { }

  private apiUrl = "http://ik.olleco.net/morse-api/";

  async postApi(model: any, callback: (res: any) => void) {
    this._http.post(this.apiUrl, model).subscribe({
      next: (res) => {
        callback(res);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

}
