import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state.service';
import { FuneralLocationService } from 'src/app/services/funeral-location.service';
import { BurrialLocationService } from 'src/app/services/burrial-location.service'; // Importez le service BurrialLocationService
import { FuneralLocation } from 'src/app/model/FuneralLocation'; // Assurez-vous que le chemin est correct
import { BurrialLocation } from 'src/app/model/BurrialLocation'; // Assurez-vous que le chemin est correct
import { Ceremony } from 'src/app/model/Ceremony';
import { CeremonyService } from 'src/app/services/ceremony.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit, OnDestroy {
  private ceremonyIdSubscription!: Subscription;
  funeralLocations: FuneralLocation[] = [];
  burrialLocations: BurrialLocation[] = [];
  nom!: string;
  prenom!: string;
  date!: Date;
  ceremony?: Ceremony;
  id!: string;
   // Déclarez la cérémonie comme optionnelle

  constructor(
    private appStateService: AppStateService,
    private funeralService: FuneralLocationService,
    private burrialService: BurrialLocationService,
    private ceremonyService: CeremonyService
  ) {}

  ngOnInit() {

    // Récupérer l'ID de la cérémonie à partir de l'URL
   
  
    this.ceremonyIdSubscription = this.appStateService.currentCeremonyId$.subscribe(ceremonyId => {
      if (ceremonyId !== null) {
        this.loadFuneralLocationsForCeremony(ceremonyId);
        this.loadBurrialLocationsForCeremony(ceremonyId);
        // Vous pouvez récupérer la cérémonie ici une fois que ceremonyId est confirmé comme non null
        this.ceremonyService.retrieveCeremony(ceremonyId).subscribe(
          (ceremony) => {
            console.log('Loaded ceremony:', ceremony);
            this.ceremony = ceremony;
            this.nom = ceremony.nom;
            this.prenom = ceremony.prenom;
            this.date = ceremony.dateFuneral;

          },
          (error) => {
            console.error('Error retrieving ceremony:', error);
            // Gérez l'erreur selon votre cas d'utilisation
          }
        );
      } else {
        this.funeralLocations = [];
        this.burrialLocations = [];
        // Assurez-vous de gérer le cas où ceremonyId est null
      }
    });
  }

  loadFuneralLocationsForCeremony(ceremonyId: number) {
    this.funeralService.findFuneralLocationsByCeremonyId(ceremonyId).subscribe(
      (locations) => {
        console.log('Loaded funeral locations:', locations);
        this.funeralLocations = locations;
      },
      (error) => {
        console.error('Error retrieving funeral locations:', error);
        this.funeralLocations = [];
      }
    );
  }

  loadBurrialLocationsForCeremony(ceremonyId: number) {
    this.burrialService.findBurrialLocationsByCeremonyId(ceremonyId).subscribe(
      (locations) => {
        console.log('Loaded burrial locations:', locations);
        this.burrialLocations = locations;
      },
      (error) => {
        console.error('Error retrieving burrial locations:', error);
        this.burrialLocations = [];
      }
    );
  }

  ngOnDestroy() {
    if (this.ceremonyIdSubscription) {
      this.ceremonyIdSubscription.unsubscribe();
    }
  }

  generateAbsoluteUrl(path: string): string {
    return `https://www.facebook.com/sharer/sharer.php?u=https://Invitaion.com/${path}`;
}


}
