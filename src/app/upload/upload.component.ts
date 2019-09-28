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
  public error : string;
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  upload(files) {
    //Si el archivo es vacio generamos error
    if (files.length === 0)
      return;

    //Iniciamos formulario
    const formData = new FormData();

    //Obtenemos archivo del formulario
    for (let file of files)
      formData.append(file.name, file);

    //Llamamos servicio encargado de subir inventario
    this.uploadService.uploadInventory(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response){
        //Si la peticion es exitosa asignamos valores
        const data=JSON.parse(JSON.stringify( event.body));
        this.equinos =  data.equinos;
        this.bovinos =  data.bovinos;
        this.error="";
      }
        
    },error=>this.error="Error Generando inventario");
  }

}
