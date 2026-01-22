import { Component, OnInit ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ceremony } from 'src/app/model/Ceremony';
import { CeremonyService } from 'src/app/services/ceremony.service';
import { FuneralLocation } from 'src/app/model/FuneralLocation';
import { FuneralLocationService } from 'src/app/services/funeral-location.service';
import { BurrialLocation } from 'src/app/model/BurrialLocation';
import { BurrialLocationService } from 'src/app/services/burrial-location.service';
import { of, switchMap } from 'rxjs';
import { TypeReligion } from 'src/app/model/TypeReligion';
import { AppStateService } from 'src/app/services/app-state.service';
import { CalendarEvent } from 'angular-calendar';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms'; // Importez FormBuilder, FormGroup et Validators depuis @angular/forms



@Component({
  selector: 'app-add-ceremony',
  templateUrl: './add-ceremony.component.html',
  styleUrls: ['./add-ceremony.component.css']
})
export class AddCeremonyComponent implements OnInit {
  protected aFormGroup!: FormGroup; // Assurez-vous d'importer FormGroup

  siteKey: string= "6Lfg56spAAAAABCrBairMwvYcAy82Rn5H5UHM7l3";

  viewDate: Date = new Date();
  @ViewChild('ceremonyForm') ceremonyForm!: NgForm;


  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Un événement',
    },
    // autres événements
  ];

  ceremony: Ceremony = new Ceremony();
  funeralLocations: FuneralLocation[] = [];
  selectedFuneralLocationId: number | null = null;
  selectedBurrialLocationId: number | null = null;
  burrialLocations: BurrialLocation[] = [];

  religions: string[] = Object.values(TypeReligion).map(value => String(value));
  
  
  constructor(
    private ceremonyService: CeremonyService, 
    private funeralLocationService: FuneralLocationService,
    private burrialLocationService: BurrialLocationService,
    private appStateService: AppStateService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    
    this.funeralLocationService.retrieveAllFuneralLocations().subscribe({
      next: locations => this.funeralLocations = locations,
      error: error => console.error(error)
    });

    this.burrialLocationService.retrieveAllBurrialLocations().subscribe({
      next: Blocations => this.burrialLocations = Blocations,
      error: error => console.error(error)
    });
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required] // Assurez-vous d'importer Validators
    });
  }



  addCeremony(form: NgForm): void {
    if (  form.valid) {
      this.ceremonyService.addCeremony(this.ceremony).subscribe({
        next: (ceremony) => {
          console.log('Ceremony added successfully', ceremony);
          
          // Mettre à jour l'ID de la cérémonie dans AppStateService
          this.appStateService.updateCeremonyId(ceremony.idCer);
  
          // Navigation ou autres actions
          this.router.navigate(['/funeral-locations', { ceremonyId: ceremony.idCer }]);
        },
        error: (error) => {
          console.error('Error adding ceremony', error);
        }
      });
    }
  }
  


toggleChat(): void {
  const chatContainer = document.getElementById('chat-container');
  if (chatContainer) {
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
  }
}








}
