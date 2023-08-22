import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  str(data: any): string {
    if (!data) return null;
    if (data.value) return data.value;
    else if (data.desc) return data.desc;
    else if (typeof data === 'string') return data;
    else return '';
  }
}
