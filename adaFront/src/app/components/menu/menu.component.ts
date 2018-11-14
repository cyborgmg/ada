import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    shared: SharedService = SharedService.getInstance();

    private items: Array<MenuItem> = new Array<MenuItem>();

    constructor() {
    }

    ngOnInit() {
        this.shared.showTemplate.subscribe((show: boolean) => {
            if (show) {
                this.populateItems();
            }
          }
        );
    }

    populateItems() {

        this.items = new Array<MenuItem>();

        if (this.shared.user.profile === 'ADMIN') {
            this.items.push({
                label: 'User',
                icon: 'pi pi-pw pi-users',
                items: [
                    {label: 'List', icon: 'pi pi-fw pi-circle-off'},
                    {label: 'New User', icon: 'pi pi-fw pi-circle-off'}
                ]
            });
        }
        // tslint:disable-next-line:max-line-length
        if (this.shared.user.profile === 'ADMIN' || this.shared.user.profile === 'CUSTUMER' || this.shared.user.profile === 'TECHNICIAN') {
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
