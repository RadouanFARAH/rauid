import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-number-keyboard',
  templateUrl: './number-keyboard.component.html',
  styleUrls: ['./number-keyboard.component.scss']
})
export class NumberKeyboardComponent {
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  @Output() keyPress: EventEmitter<number> = new EventEmitter<number>();

  onKeyPress(number: number) {
    this.keyPress.emit(number);
  }
}
