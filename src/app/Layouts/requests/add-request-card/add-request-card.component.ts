import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-add-request-card',
  templateUrl: './add-request-card.component.html',
  styleUrl: './add-request-card.component.scss'
})
export class AddRequestCardComponent {

  @Input() length:number = -1;
}
