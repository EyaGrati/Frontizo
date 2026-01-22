import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Meal } from 'src/app/model/Meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-update-meal',
  templateUrl: './update-meal.component.html',
  styleUrls: ['./update-meal.component.css']
})
export class UpdateMealComponent {

  meal: Meal = new Meal();
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  

  constructor(
    private mealService: MealService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Convertir 'id' de type string en type number
      const idNum = +id; // Le signe '+' convertit la chaîne en nombre
      this.mealService.retrieveMeal(idNum).subscribe({
        next: (meal) => {
          this.meal = meal;
          // Autres opérations...
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  updateMeal(): void {
    if (this.meal && this.meal.idMeal) {
      const formData = new FormData();
      formData.append('nameMeal', this.meal.nameMeal);
      formData.append('description', this.meal.description);
     
      formData.append('prixMeals', this.meal.prixMeals.toString());
      
  
      // Ajouter le fichier d'image uniquement s'il y en a un de sélectionné
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      } 
  
      this.mealService.updateMeal(this.meal.idMeal, formData).subscribe({
        next: () => {
          this.router.navigate(['/admin/Meals-list']);
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Form is not valid or location ID is missing');
    }
  }
  

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file: File = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
}

