import { Component, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { Meal } from 'src/app/model/Meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent {

  meal: Meal = new Meal();
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  

  @ViewChild('mealForm') mealForm!: NgForm;

  constructor(private mealService: MealService, private router: Router) {}

  addMeal(): void {
    if (this.mealForm.valid) {
      const formData = new FormData();
      formData.append('nameMeal', this.meal.nameMeal);
      formData.append('prixMeals',this.meal.prixMeals.toString())

    
      formData.append('description',this.meal.description.toString())

      formData.append('imgMeals', this.meal.imgMeals);
    

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.mealService.addMeal(formData).subscribe({
        next: (Response) => {
          console.log(Response);
          this.router.navigate(['/admin/Meals-list'])
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('le formulaire non valide');
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

