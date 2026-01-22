import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';
import { CeremonyService } from 'src/app/services/ceremony.service';
import { Ceremony } from 'src/app/model/Ceremony';
import { Meal } from 'src/app/model/Meal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  public totalPriceOfFlowers: number = 0; // Initialisation avec 0

  public PriceOfFuneralLoc: number = 0;


  public totalPriceOfMeals: number = 0; 
  constructor(
    private appStateService: AppStateService,
    private ceremonyService: CeremonyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appStateService.currentCeremonyId$.subscribe(id => {
      if (id !== null) {
        this.ceremonyService.retrieveCeremony(id).subscribe(ceremony => {
          this.calculateTotalPriceOfFlowers(ceremony);
          this.calculatePriceOfFuneralLoc(ceremony);
          this.calculateTotalPriceOfMeals(ceremony);
        });
      }
    });
  }

  private calculateTotalPriceOfFlowers(ceremony: Ceremony): void {
    console.log("Calculating total price for flowers in ceremony:", ceremony);
    if (ceremony.flowers && ceremony.flowers.length > 0) {
      this.totalPriceOfFlowers = ceremony.flowers.reduce((acc, flower) => acc + flower.prixFlower, 0);
    } else {
      this.totalPriceOfFlowers = 0; // Réinitialiser si aucune fleur n'est associée
    }
    console.log("Total price of flowers:", this.totalPriceOfFlowers);
    console.log("Flowers in ceremony:", ceremony.flowers);

  }

  private calculateTotalPriceOfMeals(ceremony: Ceremony): void {
    console.log("Calculating total price for meals in ceremony:", ceremony);
    if (ceremony.meals && ceremony.meals.length > 0) {
      this.totalPriceOfMeals = ceremony.meals.reduce((acc, meal) => acc + meal.prixMeals, 0);
    } else {
      this.totalPriceOfMeals = 0; // Réinitialiser si aucune fleur n'est associée
    }
    console.log("Total price of meals:", this.totalPriceOfMeals);
    console.log("meals in ceremony:", ceremony.meals);

  }

  private calculatePriceOfFuneralLoc(ceremony: Ceremony): void {
    console.log("Calculating  price of funeral location :", ceremony);
    if (ceremony.funeralLocations && ceremony.funeralLocations.length > 0) {
      this.PriceOfFuneralLoc = ceremony.funeralLocations.reduce((acc, funeral) => acc + funeral.priceLoc, 0);
    } else {
      this.PriceOfFuneralLoc = 0; // Réinitialiser si aucune fleur n'est associée
    }
    console.log("Total price of funeral locations:", this.PriceOfFuneralLoc);
    console.log("funeral locations  in ceremony:", ceremony.funeralLocations);

  }
  
  confirmPayment(): void {
    this.router.navigate(['/success']);
  }
}
