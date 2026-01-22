import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private ceremonyIdSource = new BehaviorSubject<number | null>(null);
  currentCeremonyId$ = this.ceremonyIdSource.asObservable();

  constructor() { }

  updateCeremonyId(id: number | null) {
    this.ceremonyIdSource.next(id);
  }
}
