import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlowerStatisticsService {
  private selectedFlowers: Map<string, number> = new Map(); // Map pour stocker les fleurs sélectionnées avec leur nombre de sélections

  constructor() { }

  trackSelectedFlower(flowerName: string): void {
    // Incrémenter le compteur de sélection pour la fleur donnée
    const count = this.selectedFlowers.get(flowerName) || 0;
    this.selectedFlowers.set(flowerName, count + 1);
  }

  getTopSelectedFlowers(): { flowerName: string, selectionCount: number }[] {
    // Convertir la Map en tableau pour pouvoir trier
    const flowersArray = Array.from(this.selectedFlowers.entries());
    // Trier le tableau en fonction du nombre de sélections dans l'ordre décroissant
    flowersArray.sort((a, b) => b[1] - a[1]);
    // Renvoyer les dix premières fleurs les plus sélectionnées
    return flowersArray.slice(0, 10).map(([flowerName, selectionCount]) => ({ flowerName, selectionCount }));
  }
}