import { Component, OnInit } from '@angular/core';
import {Car} from '../../model/car';
import {CarService} from '../../services/car.service';


@Component({
  selector: 'app-cadastro-participantes',
  templateUrl: './cadastro-participantes.component.html',
  styleUrls: ['./cadastro-participantes.component.css']
})
export class CadastroParticipantesComponent implements OnInit {

  cars: Car[];

  cols: any[] = [
    { field: 'vin', header: 'Vin' },
    { field: 'year', header: 'Year' },
    { field: 'brand', header: 'Brand' },
    { field: 'color', header: 'Color' }
  ];

  selectedCar1: Car;

  constructor(private carService: CarService) { }

  ngOnInit() {

        this.carService.getCarsSmall().then(cars => this.cars = cars);

  }

}
