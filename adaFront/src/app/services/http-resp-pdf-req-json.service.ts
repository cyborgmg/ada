import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRespPdfReqJsonService {

  public static post (url: string, data: any) {

    return  Observable.create(observer => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', SharedService.getInstance().token );
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.responseType = 'blob';
      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  const contentType = 'application/pdf';
                  const blob = new Blob([xhr.response], { type: contentType });
                  observer.next(blob);
                  observer.complete();
              } else {
                  observer.error(xhr.response);
              }
          }
      };
      xhr.send(JSON.stringify(data));
    });

  }

}
