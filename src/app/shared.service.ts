import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private variableValue: boolean;
  variableValue$ = new Subject<boolean>();

  setVariableValue(value: boolean) {
    this.variableValue = value;
    this.variableValue$.next(value);
  }

  getVariableValue() {
    return this.variableValue;
  }
}
