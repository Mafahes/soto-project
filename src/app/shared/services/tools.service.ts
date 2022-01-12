import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private dialog: MatDialog) { }
  cropImage(type, src): Promise<any> {
    return new Promise((res, rej) => {
      this.dialog
        .open(null, {
          data: src,
        })
        .afterClosed().subscribe((e) => {
          res(e);
      });
    });
  }
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
  blobToFile(theBlob, fileName): any{
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }
  dataURItoBlob(dataURI: string): any {
    return fetch(dataURI)
      .then(res => this.blobToFile(res.blob(), 'file.png'));
  }
  dataURItoFile(dataURI: string): Promise<any> {
    return fetch(dataURI)
      .then(res => this.blobToFile(res.blob(), 'file.png'))
      .then(res2 => {
        return new File([res2], 'file.png');
      });
  }
}
