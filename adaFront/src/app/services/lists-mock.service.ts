import { Injectable } from '@angular/core';
import { ListsService } from './lists.service';

@Injectable({
  providedIn: 'root'
})
export class ListsMockService extends ListsService {

  constructor() {
    super(null);
  }

  public colors = [
    {'label': 'Select Color', 'value': null},
    {'label': 'Orange', 'value': {'id': 1, 'nome': 'Orange'}},
    {'label': 'Black' , 'value': {'id': 2, 'nome': 'Black'}},
    {'label': 'Gray' , 'value': {'id': 3, 'nome': 'Gray'}},
    {'label': 'Blue' , 'value': {'id': 4, 'nome': 'Blue'}},
    {'label': 'Yellow' , 'value': {'id': 5, 'nome': 'Yellow'}},
    {'label': 'Red' , 'value': {'id': 6, 'nome': 'Red'}}
    ];

}
