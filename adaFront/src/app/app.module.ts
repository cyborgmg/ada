import { AuthGuard } from './components/security/auth.guard';
import { AuthInterceptor } from './components/security/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/security/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { routes } from './app.routes';
import { UserService } from './services/user.service';
import { SharedService } from './services/shared.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DialogService } from './services/dialog.service';
import { CustomPageComponent } from './components/custom-page/custom-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { CarComponent } from './components/car/car.component';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {SpinnerModule} from 'primeng/spinner';
import {DropdownModule} from 'primeng/dropdown';
import { DivPCalendarComponent } from './pattern/div-p-calendar/div-p-calendar.component';
import { NgxCurrencyModule } from 'ngx-currency';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { GetStatusPipe } from './pipes/get-status.pipe';
import {DialogModule} from 'primeng/dialog';
import { ButtonConfirmComponent } from './components/button-confirm/button-confirm.component';


registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    UserNewComponent,
    UserListComponent,
    CustomPageComponent,
    CarComponent,
    DivPCalendarComponent,
    GetStatusPipe,
    ButtonConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    routes,
    TableModule,
    CalendarModule,
    InputTextModule,
    SpinnerModule,
    DropdownModule,
    NgxCurrencyModule,
    DialogModule
  ],
  providers: [
    UserService,
    SharedService,
    AuthGuard,
    DialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
