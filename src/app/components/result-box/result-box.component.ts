import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-result-box',
  templateUrl: './result-box.component.html',
  styleUrls: ['./result-box.component.css']
})
export class ResultBoxComponent {
  @Input() isSuccessful: boolean;
  @Input() message: string;
  @Output() closed = new EventEmitter<void>();

  onClose() {
    this.closed.emit();
  }
}
