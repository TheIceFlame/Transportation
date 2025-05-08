import {Component, OnInit} from '@angular/core';
import {db, RequestData} from '../../services/request-db.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit{
  savedRequests: RequestData[] = [];

  async getRequests(): Promise<void> {
    this.savedRequests = await db.requests.toArray();
    console.log(this.savedRequests)
  }


  async deleteAllRequests(): Promise<void> {
    await db.requests.clear(); // Deletes all entries
    this.savedRequests = [];   // Clears the displayed list
    alert('All requests deleted.');
  }
  ngOnInit() {
    this.getRequests();
  }

}
