import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import {UploadService} from '../shared/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public progress: number;
  public equinos=[];
  public bovinos=[];
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    this.uploadService.uploadInventory(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response){
        const data=JSON.parse(JSON.stringify( event.body));
        this.equinos =  data.equinos;
        this.bovinos =  data.bovinos;
      }
        
    });
  }

}
