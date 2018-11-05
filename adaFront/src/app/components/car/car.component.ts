import { Component, OnInit } from '@angular/core';
import {Car} from '../../model/car';
import {CarService} from '../../services/car.service';
import { ListsService } from '../../services/lists.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[];

  selectedCar: Car = Car.instance;

  colors: any[];

  constructor(private carService: CarService, listsService: ListsService) {

    this.colors = listsService.colors;
   }

  ngOnInit() {

        this.carService.getCarsSmall().then(cars => this.cars = cars);
  }
/*
  onRowSelect(event) {
    this.messageService.add({severity:'info', summary:'Car Selected', detail:'Vin: ' + event.data.vin});
  }
*/
  onRowUnselect(event) {
    this.selectedCar = Car.instance;
  }

}
