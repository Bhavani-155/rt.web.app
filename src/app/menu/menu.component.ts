import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  isBiometric: any;

  constructor(private localStorageService: LocalStorageService) {

  }
  ngOnInit() {
    this.isBiometric = this.localStorageService.getValue('isBiometric');
  }
  toggleSwitch() {
    this.isBiometric = !this.isBiometric;
    this.localStorageService.setValue('isBiometric', this.isBiometric);
    this.isBiometric = this.localStorageService.getValue('isBiometric');
  }
}
