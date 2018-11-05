import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  public colors = [
    {label: 'Select Colors', value: null},
    {label: 'Orange', value: {id: 1, name: 'Orange'}},
    {label: 'Black', value: {id: 2, name: 'Black'}},
    {label: 'Gray', value: {id: 3, name: 'Gray'}},
    {label: 'Blue', value: {id: 4, name: 'Blue'}},
    {label: 'Yellow', value: {id: 5, name: 'Yellow'}},
    {label: 'Red', value: {id: 6, name: 'Red'}}
  ];

  constructor() { }
}
