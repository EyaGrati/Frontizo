import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/model/Meal';
import { MealService } from 'src/app/services/meal.service';
import { CeremonyService } from 'src/app/services/ceremony.service';
import { take } from 'rxjs/operators';
import { AppStateService } from 'src/app/services/app-state.service';
@Component({
  selector: 'app-meal-selector',
  templateUrl: './meal-selector.component.html',
  styleUrls: ['./meal-selector.component.css']
})
export class MealSelectorComponent implements OnInit {
  meals: Meal[] = [];
  selectedMeal?: Meal;

  constructor(private mealService: MealService,
    private ceremonyService: CeremonyService,
    private appStateService: AppStateService
    ) {}

  ngOnInit(): void {
    this.loadMeals();
  }

  loadMeals(): void {
    this.mealService.retrieveAllMeals().subscribe({
      next: (meals: Meal[]) => {
        this.meals = meals;
      },
      error: (error) => {
        console.error('There was an error retrieving the burial locations:', error);
      }
    });
  }


  selectMeal(selectedMeal: Meal): void {
    this.selectedMeal = selectedMeal;
    console.log('Fleur sélectionnée:', selectedMeal);
    this.affectMealToCeremony();
    // Vous pouvez ici ajouter d'autres logiques, comme naviguer vers une autre vue ou ajouter la fleur à une liste
  }


  affectMealToCeremony(): void {
    if (!this.selectedMeal) {
      console.error('No Meal selected');
      return;
    }
  
    const idMeal = this.selectedMeal.idMeal;
    
    this.appStateService.currentCeremonyId$.pipe(take(1)).subscribe(idCeremony => {
      if (idCeremony) {
        // Remplacer par la méthode correcte pour affecter une fleur
        this.ceremonyService.affecterMealsACeremony(idCeremony, idMeal).subscribe({
          next: () => {
            console.log(`Meal ${idMeal} affected to ceremony ${idCeremony}`);
            // Redirection ou message de succès
          },
          error: (error) => console.error('Error affecting flower to ceremony', error)
        });
      } else {
        console.error('No ceremony ID available');
      }
    });
  }
  
}
