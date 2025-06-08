import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.scss'
})
export class SchedulingComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      right: 'title'
    },
    events: [
      { title: 'Event 1', date: '2025-06-08' },
      { title: 'Event 2', date: '2025-06-10' },
      { title: 'Meeting', date: '2025-06-12' }
    ],
    locale:'fr',
    buttonText: {
      today: 'today' // Custom "today" label (optional)
    }
  };

}
