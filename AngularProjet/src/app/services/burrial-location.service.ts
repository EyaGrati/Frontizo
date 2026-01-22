import { Injectable } from '@angular/core';
import { BurrialLocation } from '../model/BurrialLocation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BurrialLocationService {
  private baseUrl = 'http://localhost:8082/test/api/burrials/'; // Modifier l'URL de base en conséquence


  constructor(private http: HttpClient) { }
  addBurrialLocation(formData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addBurrialLocation', formData);
  }

  updateBurrialLocation(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}updateBurrialLocation/${id}`, formData);
  }

  retrieveBurrialLocation(id: number): Observable<BurrialLocation> {
    return this.http.get<BurrialLocation>(this.baseUrl + 'retrieveBurrialLocation/' + id);
  }

  removeBurrialLocation(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'removeBurrialLocation/' + id);
  }

  retrieveAllBurrialLocations(): Observable<BurrialLocation[]> {
    return this.http.get<BurrialLocation[]>(this.baseUrl + 'retrieveAllBurrialLocations');
  }

  findBurrialLocationsByCeremonyId(ceremonyId: number): Observable<BurrialLocation[]> {
    return this.http.get<BurrialLocation[]>(`${this.baseUrl}ceremony/${ceremonyId}/burrialLocations`);
  }
}
