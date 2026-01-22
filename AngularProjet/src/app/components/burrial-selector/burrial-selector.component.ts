import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BurrialLocation } from 'src/app/model/BurrialLocation';
import { BurrialLocationService } from 'src/app/services/burrial-location.service';
import { CeremonyService } from 'src/app/services/ceremony.service';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-burrial-selector',
  templateUrl: './burrial-selector.component.html',
  styleUrls: ['./burrial-selector.component.css']
})
export class BurrialSelectorComponent implements OnInit {
  burrialLocations: BurrialLocation[] = [];
  selectedBurrialLocation?: BurrialLocation;

  constructor(
    private burrialLocationService: BurrialLocationService, 
    private ceremonyService: CeremonyService, 
    private appStateService: AppStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBurialLocations();
  }

  loadBurialLocations(): void {
    this.burrialLocationService.retrieveAllBurrialLocations().subscribe({
      next: (burrialLocations: BurrialLocation[]) => {
        this.burrialLocations = burrialLocations;
      },
      error: (error) => {
        console.error('There was an error retrieving the burial locations:', error);
      }
    });
  }

  selectBurrial(selectedLocation: BurrialLocation): void {
    this.selectedBurrialLocation = selectedLocation;
    // Ici, nous allons appeler la méthode pour affecter la localisation de sépulture à la cérémonie
    this.affectBurrialLocationToCeremony();
  }

  affectBurrialLocationToCeremony(): void {
    // Vérifier d'abord que selectedBurrialLocation n'est pas undefined
    if (!this.selectedBurrialLocation || this.selectedBurrialLocation.idBurrial === undefined) {
      console.error('No Burrial Location selected or idBurrial is undefined');
      return;
    }
  
    // Stockez idBurrial dans une variable après avoir vérifié pour non-undefined
    const idBurrial = this.selectedBurrialLocation.idBurrial;
    
    this.appStateService.currentCeremonyId$.subscribe(idCeremony => {
      if (idCeremony) {
        this.ceremonyService.affecterBurrialLocationACeremony(idCeremony, idBurrial).subscribe({
          next: () => {
            console.log(`Burrial location ${idBurrial} affected to ceremony ${idCeremony}`);
            // Redirection ou message de succès
          },
          error: (error) => console.error('Error affecting burrial location to ceremony', error)
        });
      } else {
        console.error('No ceremony ID available');
      }
    });
  }
  
}  