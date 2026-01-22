import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FArrangement } from '../model/FArrangement';

@Injectable({
  providedIn: 'root'
})
export class FarrangementService {

  private baseUrl = 'http://localhost:8082/test/api/farrangments/'; // Modifier l'URL de base en conséquence


  constructor(private http: HttpClient) { }
  addFArrangement(farrangement :FArrangement): Observable<FArrangement> {
    return this.http.post<FArrangement>(this.baseUrl + 'addFArrangement',farrangement);
  }

  updateFArrangement(id: number, farrangement: FArrangement): Observable<FArrangement> {
    return this.http.put<FArrangement>(`${this.baseUrl}updateFArrangement/${id}`, farrangement);
  }

  retrieveFArrangement(id: number): Observable<FArrangement> {
    return this.http.get<FArrangement>(this.baseUrl + 'retrieveFArrangement/' + id);
  }

  removeFArrangement(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'removeFArrangement/' + id);
  }

  retrieveAllFArrangements(): Observable<FArrangement[]> {
    return this.http.get<FArrangement[]>(this.baseUrl + 'retrieveAllFArrangements');
  }

}
