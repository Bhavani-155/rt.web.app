import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

 
  constructor() { }
  setValue(key: any, value: any) {
    this.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  getValue(key: any): any {
    if (this.hasKey(key)) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
    } else {
      return null;
    }
  }
  
  hasKey(key: any): boolean {
    return localStorage.getItem(key) ? true : false;
  }
  
  removeItem(key: any) {
    if (this.hasKey(key) ) {
    localStorage.removeItem(key);
    return true;
    }
    return false;
  }
  
  clearLocalStorage() {
    localStorage.clear();
  }
}
