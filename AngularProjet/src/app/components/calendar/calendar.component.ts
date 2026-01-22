import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FuneralLocationService } from 'src/app/services/funeral-location.service';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() locationId!: number; // Propriété pour stocker l'ID passé depuis le composant parent
  ceremonyDates: Date[] = [];

  constructor(
    private route: ActivatedRoute,
    private funeralService: FuneralLocationService
  ) { }

  ngOnInit(): void {
    // Utilisez this.locationId pour accéder à l'ID passé depuis le composant parent
    this.funeralService.getCeremonyDatesByFuneralLocationId(this.locationId).subscribe({
      next: (dates: Date[]) => {
        this.ceremonyDates = dates;
        console.log('Dates des cérémonies :', this.ceremonyDates);
        
        // Initialiser le calendrier FullCalendar
        const calendarEl: HTMLElement = document.getElementById('calendar')!;
        const calendar = new Calendar(calendarEl, {
          plugins: [dayGridPlugin],
          events: this.ceremonyDates.map(date => {
            return {
              title: 'Cérémonie',
              start: date
            };
          })
        });
        calendar.render();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des dates des cérémonies :', error);
      }
    });
  }
}