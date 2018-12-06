import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarComponent } from './car.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { SpinnerModule } from 'primeng/spinner';
import { DropdownModule } from 'primeng/dropdown';
import { NgxCurrencyModule } from 'ngx-currency';
import { DialogModule } from 'primeng/dialog';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BlockUIModule } from 'primeng/blockui';
import { CurrencyFormatPipe } from 'src/app/pipes/currency-format.pipe';
import { StatusLabelPipe } from 'src/app/pipes/status-label.pipe';
import { ProfileLabelPipe } from 'src/app/pipes/profile-label.pipe';
import { DivPCalendarComponent } from 'src/app/pattern/div-p-calendar/div-p-calendar.component';
import { ButtonConfirmComponent } from 'src/app/pattern/button-confirm/button-confirm.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';
import { ListsService } from 'src/app/services/lists.service';
import { CarService } from 'src/app/services/car.service';
import { ListsMockService } from 'src/app/services/lists-mock.service';
import { CarMokService } from 'src/app/services/car-mok.service';
import { Color } from 'src/app/model/color';

describe('CarComponent', () => {

  const orange: Color = new Color(1, 'Orange');
  const newDate: Date = new Date('10/10/2018');

  let component: CarComponent;
  let fixture: ComponentFixture<CarComponent>;

  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [
        CarComponent,
        CurrencyFormatPipe,
        StatusLabelPipe,
        ProfileLabelPipe,
        DivPCalendarComponent,
        ButtonConfirmComponent
      ],
      imports: [
        FormsModule,
        TableModule,
        CalendarModule,
        InputTextModule,
        SpinnerModule,
        DropdownModule,
        NgxCurrencyModule,
        DialogModule,
        PanelMenuModule,
        BlockUIModule,
        HttpClientModule
      ],
      providers: [
        {provide: CarService, useClass: CarMokService},
        {provide: ListsService, useClass: ListsMockService}
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('espera que component esteja instanciado', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    fixture.destroy();
  });


  describe('espera estado inicial', () => {

    describe('campos', () => {

      it('id null', () => {
        expect(component.selectedCar.id).toBeNull();
      });
      it('brand null', () => {
        expect(component.selectedCar.brand).toBeNull();
      });
      it('status null', () => {
        expect(component.selectedCar.status).toBeNull();
      });
      it('year null', () => {
        expect(component.selectedCar.year).toBeNull();
      });
      it('color null', () => {
        expect(component.selectedCar.color).toBeNull();
      });
      it('price null', () => {
        expect(component.selectedCar.price).toBeNull();
      });
      it('saleDate null', () => {
        expect(component.selectedCar.saleDate).toBeNull();
      });

    });

    describe('botões', () => {

      it('btnPrint false', () => {
        expect(component.btnPrint).toBe(false);
      });
      it('btnDeletar false', () => {
        expect(component.btnDeletar).toBe(false);
      });
      it('btnNovo true', () => {
        expect(component.btnNovo).toBe(true);
      });
      it('btnCancelar false', () => {
        expect(component.btnCancelar).toBe(false);
      });
      it('btnSalvar false', () => {
        expect(component.btnSalvar).toBe(false);
      });

    });

  });


  describe('espera estado de novo -> cancelar', () => {

    beforeAll(() => {
      component.novo();
    });

    afterAll(() => {
      component.cancel();
    });

    describe('campos', () => {

      it('id null', () => {
        expect(component.selectedCar.id).toBeNull();
      });
      it('brand null', () => {
        expect(component.selectedCar.brand).toBeNull();
      });
      it('status null', () => {
        expect(component.selectedCar.status).toBeNull();
      });
      it('year null', () => {
        expect(component.selectedCar.year).toBeNull();
      });
      it('color null', () => {
        expect(component.selectedCar.color).toBeNull();
      });
      it('price null', () => {
        expect(component.selectedCar.price).toBeNull();
      });
      it('saleDate null', () => {
        expect(component.selectedCar.saleDate).toBeNull();
      });

    });

    describe('botões', () => {

      it('btnPrint false', () => {
        expect(component.btnPrint).toBe(false);
      });
      it('btnDeletar false', () => {
        expect(component.btnDeletar).toBe(false);
      });
      it('btnNovo false', () => {
        expect(component.btnNovo).toBe(false);
      });
      it('btnCancelar true', () => {
        expect(component.btnCancelar).toBe(true);
      });
      it('btnSalvar false', () => {
        expect(component.btnSalvar).toBe(false);
      });

    });

  });


  describe('espera estado de novo -> save', () => {

    beforeAll(() => {
      component.novo();
      component.selectedCar.id = 10;
      component.selectedCar.brand = 'BMW';
      component.selectedCar.status = 'S';
      component.selectedCar.year = 2000;
      component.selectedCar.color = this.orange;
      component.selectedCar.price = 1000000;
      component.selectedCar.saleDate = this.newDate;
      component.saveCar();
    });

    describe('campos', () => {

      it('id = 10', () => {
        expect(component.selectedCar.id).toEqual(10);
      });
      it('brand = BMW', () => {
        expect(component.selectedCar.brand).toEqual('BMW');
      });
      it('status = S', () => {
        expect(component.selectedCar.status).toEqual('S');
      });
      it('year = 2000', () => {
        expect(component.selectedCar.year).toEqual(2000);
      });
      it('color = Orange', () => {
        expect(component.selectedCar.color).toEqual(this.orange);
      });
      it('price = 10.000,00', () => {
        expect(component.selectedCar.price).toEqual(1000000);
      });
      it('saleDate = 10/10/2018', () => {
        expect(component.selectedCar.saleDate).toEqual(this.newDate);
      });
      it('cars.length = 1', () => {
        expect(component.cars.length).toEqual(1);
      });

    });

    describe('botões', () => {

      it('btnPrint true', () => {
        expect(component.btnPrint).toBe(true);
      });
      it('btnDeletar true', () => {
        expect(component.btnDeletar).toBe(true);
      });

      it('btnNovo true', () => {
        expect(component.btnNovo).toBe(true);
      });

      it('btnCancelar false', () => {
        expect(component.btnCancelar).toBe(false);
      });
      it('btnSalvar false', () => {
        expect(component.btnSalvar).toBe(false);
      });

    });

  });

});
