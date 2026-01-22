import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FuneralLocation } from '../model/FuneralLocation';

@Injectable({
  providedIn: 'root'
})
export class FuneralLocationService {

  private baseUrl = 'http://localhost:8082/test/api/funerals/'; // Modifier l'URL de base en conséquence

  constructor(private http: HttpClient) { }

  addFuneralLocation(formData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addFuneralLocation', formData);
  }

  updateFuneralLocation(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}updateFuneralLocation/${id}`, formData);
  }

  retrieveFuneralLocation(id: number): Observable<FuneralLocation> {
    return this.http.get<FuneralLocation>(this.baseUrl + 'retrieveFuneralLocation/' + id);
  }

  removeFuneralLocation(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'removeFuneralLocation/' + id);
  }

  retrieveAllFuneralLocations(): Observable<FuneralLocation[]> {
    return this.http.get<FuneralLocation[]>(this.baseUrl + 'retrieveAllFuneralLocations');
  }
  
  findFuneralLocationsByCeremonyId(ceremonyId: number): Observable<FuneralLocation[]> {
    return this.http.get<FuneralLocation[]>(`${this.baseUrl}ceremony/${ceremonyId}/funeralLocations`);
}

findFuneralLocationsByReligion(religion: string): Observable<FuneralLocation[]> {
  return this.http.get<FuneralLocation[]>(`${this.baseUrl}funeralLocationsByReligion/${religion}`);
}


 // Nouvelle méthode pour récupérer les dates des cérémonies associées à un emplacement de funérarium
 getCeremonyDatesByFuneralLocationId(funeralLocationId: number): Observable<Date[]> {
  return this.http.get<Date[]>(`${this.baseUrl}${funeralLocationId}/ceremony-dates`);
}

}