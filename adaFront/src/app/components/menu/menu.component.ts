import { SharedService } from './../../services/shared.service';
import { Component, AfterViewInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit {

    share: SharedService = SharedService.getInstance();

    private items: Array<MenuItem> = new Array<MenuItem>();

    constructor() {
    }

    ngAfterViewInit() {
    }

    public populateItems() {

         this.items = new Array<MenuItem>();

        if (this.share.user.profile === 'ADMIN') {
            this.items.push({
                label: 'User',
                icon: 'pi pi-pw pi-users',
                items: [
                    {label: 'List', icon: 'pi pi-fw pi-circle-off'},
                    {label: 'New User', icon: 'pi pi-fw pi-circle-off'}
                ]
            });
        }
        if (this.share.user.profile === 'ADMIN' || this.share.user.profile === 'CUSTUMER' || this.share.user.profile === 'TECHNICIAN') {
            this.items.push({
                label: 'Cadastro',
                icon: 'pi pi-fw pi-folder-open',
                routerLink: null,
                items: [
                    {label: 'Car', routerLink: ['/car'], icon: 'pi pi-fw pi-circle-off', items: null}
                ]
            });
        }

    }

}
