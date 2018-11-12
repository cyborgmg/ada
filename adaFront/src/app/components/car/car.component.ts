import { Component, OnInit, ViewChild } from '@angular/core';
import {Car} from '../../model/car';
import {CarService} from '../../services/car.service';
import { ListsService } from '../../services/lists.service';
import { ResponseApi } from '../../model/response-api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  @ViewChild('ptable') ptable: Table;

  cars: Array<Car> = new Array<Car>(); // Car[];
  selectedCar: Car = Car.instance;
  currentCar: Car = Car.instance;
  message: {};
  classCss: {};

  btnSalvar: boolean;
  btnCancelar: boolean;
  btnNovo: boolean;
  btnDeletar: boolean;

  constructor(private carService: CarService, private listsService: ListsService) {
  }

  ngOnInit() {
    this.navigate ();
  }

  findCarParams() {
    this.carService.findCarParams(this.currentCar).subscribe((responseApi: ResponseApi) => {
      this.cars = responseApi['data'];
      this.selectedCar = this.cars.length > 0 ? this.cars[0] : Car.instance;
      this.clone();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  saveCar() {
    this.carService.saveCar(this.currentCar).subscribe((responseApi: ResponseApi) => {
      this.selectedCar = responseApi['data'];
      this.cars = new Array<Car>();
      this.cars.push(this.selectedCar);
      this.clone();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  deleteCar() {
    this.carService.deleteCar(this.currentCar.id).subscribe((responseApi: ResponseApi) => {

      let idx = 0;
      this.cars.forEach((element: Car) => {
        if (element.id === this.currentCar.id ) {
          this.cars.splice(idx, 1);
        }
        idx++;
      });
      this.selectedCar = this.cars[0];
      this.clone();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  printCars() {

    this.carService.printCars(this.cars).subscribe(data => {

      const blob = new Blob([(<any>data)], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);

    }, err => {
      this.showMessage({
        type: 'error',
        text: err
      });
    });

  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string) {
    this.classCss = {
      'alert': true
    };
    this.classCss['alert-' + type] = true;
  }

  onRowUnselect(event) {
    this.selectedCar = JSON.parse(JSON.stringify( this.currentCar ));
    this.navigate();
  }

  clone() {
    this.currentCar = JSON.parse(JSON.stringify( this.selectedCar ));
    this.navigate();
  }

  novo() {
    this.selectedCar = Car.instance;
    this.cars.push(this.selectedCar);
    this.clone();
  }

  navigate () {

    const enable: boolean = (JSON.stringify(this.currentCar) === JSON.stringify(this.selectedCar));
    const empty: boolean = (this.selectedCar.id != null);

    this.ptable.selectionMode = enable ? 'single' : 'none';
    this.btnSalvar   = enable;
    this.btnCancelar = enable;
    this.btnNovo     = !enable;
    this.btnDeletar  = !(empty && enable);
  }

  clear() {
    this.currentCar = Car.instance;
  }

}
