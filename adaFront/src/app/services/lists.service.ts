import { Injectable } from '@angular/core';
import { ColorService } from './color.service';
import { ResponseApi } from '../model/response-api';
import { DropDown } from '../model/dropdown';
import { Color } from '../model/color';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  colors: Array<DropDown<Color>>;

  public status = [
    {label: 'Select Status', value: null},
    {label: 'Basic', value: 'B'},
    {label: 'Simple', value: 'S'},
    {label: 'Plus', value: 'P'}
  ];

  public profiles = [
    {label: 'Selecione um Perfil', value: null},
    {label: 'ADMIN', value: 'ROLE_ADMIN'},
    {label: 'CUSTUMER', value: 'ROLE_CUSTUMER'},
    {label: 'TECHNICIAN', value: 'ROLE_TECHNICIAN'}
  ];

  constructor(private colorService: ColorService) {
      if (colorService != null) {
        this.colorService.findAllDropDown().subscribe((responseApi: ResponseApi) => {
          this.colors = responseApi['data'];
        }, err => {
          console.log(err['error']['errors'][0]);
        });
      }
   }

}
