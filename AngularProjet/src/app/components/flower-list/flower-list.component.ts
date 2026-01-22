import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlowerService } from 'src/app/services/flower.service';
import { Flower } from 'src/app/model/Flower';
import { Router } from '@angular/router'; // Importez Router d'@angular/router
@Component({
  selector: 'app-flower-list',
  templateUrl: './flower-list.component.html',
  styleUrls: ['./flower-list.component.css']
})
export class FlowerListComponent {

  flowers: Flower[] = [];

  constructor(private flowerService: FlowerService, private router: Router) {}

  ngOnInit(): void {
    this.loadBurialLocations();
  }

  loadBurialLocations(): void {
    this.flowerService.retrieveAllFlowers().subscribe({
      next: (flowers: Flower[]) => {
        this.flowers = flowers;
      },
      error: (error) => {
        console.error('There was an error retrieving the burial locations:', error);
      }
    });
  }

  deleteFlower(id: number): void {
    if (confirm('Are you sure you want to delete this burial location?')) {
      this.flowerService.removeFlower(id).subscribe({
        next: () => {
          // Remove the deleted location from the list
          this.flowers = this.flowers.filter(flower => flower.idFlower !== id);
        },
        error: (error) => {
          console.error('Error deleting the burial location:', error);
        }
      });
    }
  }

  editFlower(id: number): void {
    this.router.navigate(['/admin/update-flower', id]);
  }
}
