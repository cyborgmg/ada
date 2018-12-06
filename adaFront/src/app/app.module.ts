import { AuthGuard } from './components/security/auth.guard';
import { AuthInterceptor } from './components/security/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import {DialogModule} from 'primeng/dialog';
import { ButtonConfirmComponent } from './pattern/button-confirm/button-confirm.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { StatusLabelPipe } from './pipes/status-label.pipe';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import {BlockUIModule} from 'primeng/blockui';
import { ProfileLabelPipe } from './pipes/profile-label.pipe';
import { ListsService } from './services/lists.service';

registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    CarComponent,
    DivPCalendarComponent,
    ButtonConfirmComponent,
    CurrencyFormatPipe,
    StatusLabelPipe,
    CadastroUsuarioComponent,
    ProfileLabelPipe
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
    DialogModule,
    PanelMenuModule,
    BlockUIModule
  ],
  providers: [
    UserService,
    SharedService,
    AuthGuard,
    ListsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
