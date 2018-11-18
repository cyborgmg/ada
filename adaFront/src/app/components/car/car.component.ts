import { Component, OnInit, ViewChild } from '@angular/core';
import {Car} from '../../model/car';
import {CarService} from '../../services/car.service';
import { ListsService } from '../../services/lists.service';
import { ResponseApi } from '../../model/response-api';
import { Table } from 'primeng/table';
import { Utils } from 'src/app/utils';
import { BaseCadastro } from 'src/app/pattern/base-cadastro';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent extends BaseCadastro implements OnInit {

  @ViewChild('ptable') ptable: Table;

  cars: Array<Car> = new Array<Car>();
  selectedCar: Car = Car.getInstance();
  oldSelectedCar: Car = Car.getInstance();

  btnSalvar: boolean;
  btnCancelar: boolean;
  btnNovo: boolean;
  btnDeletar: boolean;
  btnPrint: boolean;

  constructor(private carService: CarService, private listsService: ListsService) {
    super();
  }

  ngOnInit() {
   this.navigate();
   this.clone();
  }

  findCarParams() {
    this.carService.findCarParams(this.selectedCar).subscribe((responseApi: ResponseApi) => {
      this.cars = responseApi['data'];
      this.selectedCar = this.cars.length > 0 ? this.cars[0] : Car.getInstance();
      this.clone();
      this.navigate();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  saveCar() {
    this.carService.saveCar(this.selectedCar).subscribe((responseApi: ResponseApi) => {
      this.selectedCar = responseApi['data'];
      this.cars = new Array<Car>();
      this.cars.push(this.selectedCar);
      this.clone();
      this.navigate();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  deleteCar() {
     this.carService.deleteCar(this.selectedCar.id).subscribe((responseApi: ResponseApi) => {
      Utils.arrayRemoveItem(this.cars, this.selectedCar, 'id');
      this.selectedCar = this.cars.length > 0 ? this.cars[0] : Car.getInstance();
      this.clone();
      this.navigate();
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

  onRowUnselect(event) {
    this.selectedCar = JSON.parse(JSON.stringify( this.oldSelectedCar ));
  }

  clone() {
    console.log('clone...');
    this.oldSelectedCar = JSON.parse(JSON.stringify( this.selectedCar ));
  }

  novo() {
    this.cars.push(Car.getInstance());
    this.selectedCar = Car.getInstance();
    Utils.cleanObject(this.selectedCar);
    this.navigate();
  }

  cancel() {
    if (this.selectedCar.id === null) {
      Utils.arrayRemoveItem(this.cars, this.selectedCar, 'id');
    }
    this.selectedCar = JSON.parse(JSON.stringify( this.oldSelectedCar ));
    Utils.arraySetItem(this.cars, this.selectedCar, 'id');
    this.navigate();
  }

  navigate() {

    const edit: boolean = (JSON.stringify(this.oldSelectedCar) !== JSON.stringify(this.selectedCar));
    const idIsNull: boolean = (this.selectedCar.id == null);
    const full: boolean = (this.cars.length > 0);
    const required: boolean = !Utils.strIsEmpty(this.selectedCar.brand);
    const novo: boolean = ( JSON.stringify(this.cars[this.cars.length - 1]) === JSON.stringify(this.selectedCar) ) && (idIsNull) ;

    this.btnSalvar   = full && edit && required;
    this.btnCancelar = full && ( novo || edit );
    this.btnNovo     = !novo && !edit;
    this.btnDeletar  = full && !idIsNull && !edit;
    this.btnPrint    = full && !this.btnCancelar;

    // console.log(`this.cars.length=${this.cars.length}`);
    // console.log(`this.selectedCar.id=${this.selectedCar.id}`);
    // console.log(`this.selectedCar=${JSON.stringify(this.selectedCar)}`);
    // console.log(`this.oldSelectedCar=${JSON.stringify(this.oldSelectedCar)}`);
    // console.log(`===============================================================================================`);

  }

  clear() {
    this.selectedCar = Car.getInstance();
    this.navigate();
  }

}
