import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meal } from 'src/app/model/Meal';
import { MealService } from 'src/app/services/meal.service';
import { Router } from '@angular/router'; // Importez Router d'@angular/router
@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.css']
})
export class MealsListComponent {

  meals: Meal[] = [];

  constructor(private mealService: MealService, private router: Router) {}

  ngOnInit(): void {
    this.loadBurialLocations();
  }

  loadBurialLocations(): void {
    this.mealService.retrieveAllMeals().subscribe({
      next: (meals: Meal[]) => {
        this.meals = meals;
      },
      error: (error) => {
        console.error('There was an error retrieving the burial locations:', error);
      }
    });
  }

  deleteFlower(id: number): void {
    if (confirm('Are you sure you want to delete this burial location?')) {
      this.mealService.removeMeal(id).subscribe({
        next: () => {
          // Remove the deleted location from the list
          this.meals = this.meals.filter(meal => meal.idMeal !== id);
        },
        error: (error) => {
          console.error('Error deleting the burial location:', error);
        }
      });
    }
  }

  editMeal(id: number): void {
    this.router.navigate(['/admin/update-meal', id]);
    
  }
}
