import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flower } from '../model/Flower';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  private baseUrl = 'http://localhost:8082/test/api/flowers/'; // Modifier l'URL de base en conséquence


  constructor(private http: HttpClient) { }
  addFlower(formData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addFlower', formData);
  }

  updateFlower(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}updateFlower/${id}`, formData);
  }

  retrieveFlower(id: number): Observable<Flower> {
    return this.http.get<Flower>(this.baseUrl + 'retrieveFlower/' + id);
  }

  removeFlower(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'removeFlower/' + id);
  }

  retrieveAllFlowers(): Observable<Flower[]> {
    return this.http.get<Flower[]>(this.baseUrl + 'retrieveAllFlowers');
  }
}
