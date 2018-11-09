import { Injectable } from '@angular/core';
import { ColorService } from './color.service';
import { ResponseApi } from '../model/response-api';
import { DropDown } from '../model/dropdown';
import { Color } from '../model/color';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  colors: DropDown<Color>[];

  public status = [
    {label: 'Select Status', value: null},
    {label: 'Basic', value: 'B'},
    {label: 'Simple', value: 'S'},
    {label: 'Plus', value: 'P'}
  ];

  constructor(private colorService: ColorService ) {

      this.colorService.findAllDropDown().subscribe((responseApi: ResponseApi) => {
        this.colors = responseApi['data'];
      }, err => {
        console.log(err['error']['errors'][0]);
      });

   }

}
