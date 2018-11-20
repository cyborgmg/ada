import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AuthGuard } from './components/security/auth.guard';
import { CarComponent } from './components/car/car.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'user', component: CadastroUsuarioComponent, canActivate: [AuthGuard]},
    {path: 'car', component: CarComponent, canActivate: [AuthGuard]}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
