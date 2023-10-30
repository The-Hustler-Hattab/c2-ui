import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  isLoading: Subject<boolean> = new Subject<boolean>();

  constructor() { }
  show() {
    this.isLoading.next(true);
  }
  hide() {
    this.isLoading.next(false);

  }


}
