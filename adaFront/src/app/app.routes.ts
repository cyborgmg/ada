import { UserListComponent } from './components/user-list/user-list.component';
import {HomeComponent} from './components/home/home.component';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AuthGuard } from './components/security/auth.guard';
import { UserNewComponent } from './components/user-new/user-new.component';
import { CustomPageComponent } from './components/custom-page/custom-page.component';
import { CarComponent } from './components/car/car.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'user-new', component: UserNewComponent, canActivate: [AuthGuard]},
    {path: 'user-new/:id', component: UserNewComponent, canActivate: [AuthGuard]},
    {path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]},
    {path: 'custom-page', component: CustomPageComponent, canActivate: [AuthGuard]},
    {path: 'car', component: CarComponent, canActivate: [AuthGuard]}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
