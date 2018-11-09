import { Component, OnInit } from '@angular/core';
import {Car} from '../../model/car';
import {CarService} from '../../services/car.service';
import { ListsService } from '../../services/lists.service';
import { ResponseApi } from '../../model/response-api';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[];
  selectedCar: Car = Car.instance;
  currentCar: Car = Car.instance;
  message: {};
  classCss: {};

  // tslint:disable-next-line:no-inferrable-types
  selectionMode: string = 'single';
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
      this.selectedCar = this.cars[0];
      this.clone();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
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
  }

  clone() {
    this.currentCar = JSON.parse(JSON.stringify( this.selectedCar ));
    this.navigate();
  }

  navigate () {

    const enable: boolean = (JSON.stringify(this.currentCar) === JSON.stringify(this.selectedCar));
    const empty: boolean = (this.selectedCar.id != null);

    this.selectionMode = enable ? 'single' : 'none';

    this.btnSalvar   = enable;
    this.btnCancelar = enable;
    this.btnNovo     = !enable;
    this.btnDeletar  = !(empty && enable);
  }

}
