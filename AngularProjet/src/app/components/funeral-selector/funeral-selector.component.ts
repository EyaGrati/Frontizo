import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuneralLocation } from 'src/app/model/FuneralLocation';
import { FuneralLocationService } from 'src/app/services/funeral-location.service';
import { CeremonyService } from 'src/app/services/ceremony.service';
import { TypeReligion } from 'src/app/model/TypeReligion';
import { TypeLocation } from 'src/app/model/TypeLocation';
import { Ceremony } from 'src/app/model/Ceremony';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from '../calendar/calendar.component';

// AppStateService est retiré car il n'est pas utilisé dans le code fourni
// import { AppStateService } from 'src/app/services/app-state.service';
// take est retiré car il n'est pas utilisé dans le code fourni
// import { take } from 'rxjs/operators';

@Component({
  selector: 'app-funeral-selector',
  templateUrl: './funeral-selector.component.html',
  styleUrls: ['./funeral-selector.component.css']
})
export class FuneralSelectorComponent implements OnInit {
  funeralHomes: FuneralLocation[] = [];
  ritualLocations: FuneralLocation[] = [];
  selectedFuneralLocations: FuneralLocation[] = [];
  ceremonyId?: number;
  public ceremonyReligionType?: TypeReligion;
  ceremony!: Ceremony;

  matchingTypeLocation!: string;

  public TypeLocation = TypeLocation; // Permet d'accéder à l'énumération dans le template



  constructor(
    private route: ActivatedRoute,
    private funeralLocationService: FuneralLocationService,
    private ceremonyService: CeremonyService,
    private router: Router,
    private modalService: NgbModal
  ) { }
  
  ngOnInit(): void {
    this.ceremonyId = Number(this.route.snapshot.paramMap.get('ceremonyId'));
    if (this.ceremonyId) {
      this.ceremonyService.retrieveCeremony(this.ceremonyId).subscribe(ceremony => {
        this.ceremony = ceremony;
        this.ceremonyReligionType = ceremony.religion;
        this.loadFuneralLocations();

        this.matchingTypeLocation = this.getMatchingTypeLocationAsString(this.ceremonyReligionType);
      });
    } else {
      console.error('Ceremony ID is missing');
    }
  }


  
  loadFuneralLocations(): void {
    this.funeralLocationService.retrieveAllFuneralLocations().subscribe({
      next: (funeralLocations: FuneralLocation[]) => {
        this.funeralHomes = funeralLocations.filter(location => location.typeLocation.toString() === 'FuneralHome');
        if (this.ceremonyReligionType) {
          this.loadFuneralByreligion(this.ceremonyReligionType);
        }
      },
      error: (error) => console.error(error)
    });
  }
  
  loadFuneralByreligion(religionType: TypeReligion): void {
    this.funeralLocationService.findFuneralLocationsByReligion(religionType.toString()).subscribe({
      next: (locations: FuneralLocation[]) => {
        this.ritualLocations = locations;
      },
      error: (error) => console.error(error)
    });
  }

 


  selectFuneral(selectedFuneral: FuneralLocation): void {
    const index = this.selectedFuneralLocations.findIndex(loc => loc.idLoc === selectedFuneral.idLoc);
    if (index > -1) {
      this.selectedFuneralLocations.splice(index, 1);
    } else {
      this.selectedFuneralLocations.push(selectedFuneral);
    }
    // Vérifie si ceremonyId est défini avant de faire l'appel
    if (this.ceremonyId !== undefined) {
      this.affectFuneralLocToCeremony(selectedFuneral);
    }
  }


  
  goToFlowers(): void {
    this.router.navigate(['/flowers']);
  }
  
  toggleChat(): void {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
    }
  }

  affectFuneralLocToCeremony(selectedFuneral: FuneralLocation): void {
    // Pas besoin de vérifier à nouveau ici car on le fait déjà dans selectFuneral
    this.ceremonyService.affecterFuneralLocationsACeremony(this.ceremonyId!, selectedFuneral.idLoc).subscribe({
      next: (response) => console.log(`Funeral location ${selectedFuneral.idLoc} affected to ceremony`, response),
      error: (error) => console.error('Error affecting funeral location to ceremony', error)
    });
  }


  getMatchingTypeLocationAsString(ceremonyReligionType: TypeReligion): string {
    switch (ceremonyReligionType.toString()) {
      case 'Muslim':
        return 'Mosquees';
      case 'Christian':
        return 'Churchs';
      case 'Jewish':
        return 'Synagogues';
      default:
        return 'Temples';
    }
  }
  
  
  goToCalendar(id: number): void {
    const modalRef = this.modalService.open(CalendarComponent, { size: 'sm' });
    modalRef.componentInstance.locationId = id; // Passer l'ID à CalendarComponent
  }
}