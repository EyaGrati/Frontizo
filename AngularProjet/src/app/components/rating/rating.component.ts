import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() locationId!: string; // Identifiant unique pour chaque location
  
  userRating = 0;
  ratings: number[] = [];
  averageRating = 0;

  ngOnInit() {
    this.loadRatings();
  }

  loadRatings() {
    // Utiliser locationId pour récupérer les ratings spécifiques à la carte
    const storedRatings = JSON.parse(localStorage.getItem(`ratings-${this.locationId}`) || '[]');
    this.ratings = storedRatings;
    this.calculateAverageRating();
  }

  rateUser(event: MouseEvent,rating: number): void {
    event.stopPropagation();
    this.userRating = rating;
    this.ratings.push(rating);
    this.calculateAverageRating();
    // Sauvegarder les ratings mis à jour dans localStorage avec l'identifiant unique
    localStorage.setItem(`ratings-${this.locationId}`, JSON.stringify(this.ratings));
  }

  calculateAverageRating(): void {
    const sum = this.ratings.reduce((a, b) => a + b, 0);
    this.averageRating = this.ratings.length > 0 ? parseFloat((sum / this.ratings.length).toFixed(2)) : 0;
  }


  
}
