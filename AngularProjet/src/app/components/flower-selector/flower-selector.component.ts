import { Component, OnInit } from '@angular/core';
import { Flower } from 'src/app/model/Flower';
import { FlowerService } from 'src/app/services/flower.service';
import { AppStateService } from 'src/app/services/app-state.service';
import { CeremonyService } from 'src/app/services/ceremony.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FlowerStatisticsService } from 'src/app/services/flower-statistics.service';
@Component({
  selector: 'app-flower-selector',
  templateUrl: './flower-selector.component.html',
  styleUrls: ['./flower-selector.component.css']
})
export class FlowerSelectorComponent {

  flowers: Flower[] = [];
  selectedFlower?: Flower;


  constructor(
    private flowerService: FlowerService, 
    private appStateService: AppStateService,
    private ceremonyService: CeremonyService,
    private router:Router,
    private flowerStatisticsService: FlowerStatisticsService
  ) {}
  

  ngOnInit(): void {
    this.loadBurialLocations();
  }

  loadBurialLocations(): void {
    this.flowerService.retrieveAllFlowers().subscribe({
      next: (flowers: Flower[]) => {
        this.flowers = flowers;
      },
      error: (error) => {
        console.error('There was an error retrieving the burial locations:', error);
      }
    });
  }


    // Ajoutez cette méthode
    selectFlower(selectedFlower: Flower): void {
      this.selectedFlower = selectedFlower;
      console.log('Fleur sélectionnée:', selectedFlower);
      // Vous pouvez ici ajouter d'autres logiques, comme naviguer vers une autre vue ou ajouter la fleur à une liste
      this.affectFlowerToCeremony();
      this.flowerStatisticsService.trackSelectedFlower(selectedFlower.nomFlower);
    }


    affectFlowerToCeremony(): void {
      if (!this.selectedFlower) {
        console.error('No flower selected');
        return;
      }
    
      const idFlower = this.selectedFlower.idFlower;
      
      this.appStateService.currentCeremonyId$.pipe(take(1)).subscribe(idCeremony => {
        if (idCeremony) {
          // Remplacer par la méthode correcte pour affecter une fleur
          this.ceremonyService.affecterFlowersACeremony(idCeremony, idFlower).subscribe({
            next: () => {
              console.log(`Flower ${idFlower} affected to ceremony ${idCeremony}`);
              // Redirection ou message de succès
            },
            error: (error) => console.error('Error affecting flower to ceremony', error)
          });
        } else {
          console.error('No ceremony ID available');
        }
      });
    }


    toggleChat(): void {
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
      }
    }


    payer(): void {
      this.router.navigate(['/pay']);
    }
    
}
