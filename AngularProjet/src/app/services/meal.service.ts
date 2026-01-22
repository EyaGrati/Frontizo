import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meal } from '../model/Meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private baseUrl = 'http://localhost:8082/test/api/meals/'; // Modifier l'URL de base en conséquence

  constructor(private http: HttpClient) { }

  addMeal(formData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addMeal', formData);
  }

  updateMeal(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}updateMeal/${id}`, formData);
  }

  retrieveMeal(id: number): Observable<Meal> {
    return this.http.get<Meal>(this.baseUrl + 'retrieveMeal/' + id);
  }

  removeMeal(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'removeMeal/' + id);
  }

  retrieveAllMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.baseUrl + 'retrieveAllMeals');
  }
}
