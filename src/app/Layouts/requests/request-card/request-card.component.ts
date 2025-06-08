import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.scss'
})
export class RequestCardComponent {
  @Input() item: any;
  @Output() deleteRequest = new EventEmitter<number>(); // send back the ID

  onDelete() {
    this.deleteRequest.emit(this.item.id);
  }
}
