import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ceremony } from '../model/Ceremony';
@Injectable({
  providedIn: 'root'
})
export class CeremonyService {

  private baseUrl = 'http://localhost:8082/test/api/ceremonies/'; // Modifier l'URL de base en conséquence


  constructor(private http: HttpClient) { }
  addCeremony(ceremony :Ceremony): Observable<Ceremony> {
    return this.http.post<Ceremony>(this.baseUrl + 'addCeremony',ceremony);
  }

  updateCeremony(id: number, ceremony: Ceremony): Observable<Ceremony> {
    return this.http.put<Ceremony>(`${this.baseUrl}updateCeremony/${id}`, ceremony);
  }

  retrieveCeremony(id: number): Observable<Ceremony> {
    return this.http.get<Ceremony>(this.baseUrl + 'retrieveCeremony/' + id);
  }

  removeCeremony(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'removeCeremony/' + id);
  }

  retrieveAllCeremonies(): Observable<Ceremony[]> {
    return this.http.get<Ceremony[]>(this.baseUrl + 'retrieveAllCeremonies');
  }

  affecterFuneralLocationsACeremony(idCeremony: number, idFuneral: number): Observable<Ceremony> {
    return this.http.post<Ceremony>(`${this.baseUrl}${idCeremony}/funerals/${idFuneral}`, {});
  }

  affecterBurrialLocationACeremony(idCeremony: number, idBurrial: number): Observable<Ceremony> {
    return this.http.post<Ceremony>(`${this.baseUrl}${idCeremony}/burrialLocation/${idBurrial}`, {});
  }

  affecterFlowersACeremony(idCeremony: number, idFlower: number): Observable<Ceremony> {
    return this.http.post<Ceremony>(`${this.baseUrl}${idCeremony}/flowers/${idFlower}`, {});
  }

  affecterMealsACeremony(idCeremony: number, idMeal: number): Observable<Ceremony> {
    return this.http.post<Ceremony>(`${this.baseUrl}${idCeremony}/meals/${idMeal}`, {});
  }


  



 
}


