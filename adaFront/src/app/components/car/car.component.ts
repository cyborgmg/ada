import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from '../../model/car';
import { CarService } from '../../services/car.service';
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
  // tslint:disable-next-line:no-inferrable-types
  blockedPtable: boolean = false;

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
   this.copy();
   this.navigate();
  }

  findCarParams() {
    this.carService.findCarParams(this.selectedCar).subscribe((responseApi: ResponseApi) => {
      this.cars = responseApi['data'];
      this.selectedCar = this.cars.length > 0 ? this.cars[0] : Car.getInstance();
      this.copy();
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
      this.copy();
      this.navigate();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  deleteCar() {
     this.carService.deleteCar(this.selectedCar.id).subscribe(() => {
      Utils.arrayRemoveItem(this.cars, this.selectedCar, 'id');
      this.selectedCar = this.cars.length > 0 ? this.cars[0] : Car.getInstance();
      this.copy();
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

  onRowUnselect(event: Event) {
    this.selectedCar = Utils.clone( this.oldSelectedCar );
  }

  copy() {
    this.oldSelectedCar = Utils.clone(this.selectedCar);
  }

  novo() {
    const car: Car = Car.getInstance();
    this.cars.push(car);
    this.selectedCar = car ;
    Utils.cleanObject(this.selectedCar);
    this.navigate();
  }

  cancel() {
    if (this.selectedCar.id === null) {
      Utils.arrayRemoveItem(this.cars, this.selectedCar, 'id');
    }
    this.selectedCar = Utils.clone( this.oldSelectedCar );
    Utils.arraySetItem(this.cars, this.selectedCar, 'id');
    this.navigate();
  }

  clear() {
    Utils.cleanObject(this.selectedCar, 'id');
    this.navigate();
  }

  navigate() {

    const edit: boolean = (JSON.stringify(this.oldSelectedCar) !== JSON.stringify(this.selectedCar));
    const idIsNull: boolean = (this.selectedCar.id == null);
    const full: boolean = (this.cars.length > 0);
    const required: boolean = !Utils.strIsEmpty(this.selectedCar.brand);
    // tslint:disable-next-line:max-line-length
    const novo: boolean = ( JSON.stringify(this.cars[this.cars.indexOf(this.selectedCar)]) === JSON.stringify(this.selectedCar) ) && (idIsNull) ;

    this.btnSalvar   = full && edit && required;
    this.btnCancelar = full && ( novo || edit );
    this.btnNovo     = !novo && !edit;
    this.btnDeletar  = full && !idIsNull && !edit;
    this.btnPrint    = full && !this.btnCancelar;

    this.blockedPtable = this.btnCancelar;

    // this.ptable.selectionMode = !this.btnCancelar ? 'single' : 'none';

    // console.log(`this.cars.length=${this.cars.length}`);
    // console.log(`this.selectedCar.id=${this.selectedCar.id}`);
    // console.log(`this.selectedCar=${JSON.stringify(this.selectedCar)}`);
    // console.log(`this.oldSelectedCar=${JSON.stringify(this.oldSelectedCar)}`);
    // console.log(`!novo=${!novo} && !edit=${!edit}`);
    // console.log(`===============================================================================================`);

  }

}
