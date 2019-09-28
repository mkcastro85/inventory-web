import { Injectable } from '@angular/core';
import { AppConfig } from './AppConfig';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadInventory(formData){
    const uploadReq = new HttpRequest('POST', AppConfig.API_ENDPOINT, formData, {
      reportProgress: true,
    });
    return this.http.request(uploadReq);
  }
}
