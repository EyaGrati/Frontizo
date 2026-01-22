import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BurrialLocation } from 'src/app/model/BurrialLocation';
import { BurrialLocationService } from 'src/app/services/burrial-location.service';
import { Router } from '@angular/router'; // Importez Router d'@angular/router

@Component({
  selector: 'app-burrial-location-list',
  templateUrl: './burrial-location-list.component.html',
  styleUrls: ['./burrial-location-list.component.css']
})
export class BurrialLocationListComponent implements OnInit {

  burrialLocations: BurrialLocation[] = [];

  constructor(private burrialLocationService: BurrialLocationService, private router: Router) {}

  ngOnInit(): void {
    this.loadBurialLocations();
  }

  loadBurialLocations(): void {
    this.burrialLocationService.retrieveAllBurrialLocations().subscribe({
      next: (burrialLocations: BurrialLocation[]) => {
        this.burrialLocations = burrialLocations;
      },
      error: (error) => {
        console.error('There was an error retrieving the burial locations:', error);
      }
    });
  }

  deleteBurrialLocation(id: number): void {
    if (confirm('Are you sure you want to delete this burial location?')) {
      this.burrialLocationService.removeBurrialLocation(id).subscribe({
        next: () => {
          // Remove the deleted location from the list
          this.burrialLocations = this.burrialLocations.filter(location => location.idBurrial !== id);
        },
        error: (error) => {
          console.error('Error deleting the burial location:', error);
        }
      });
    }
  }

  editBurrialLocation(id: number): void {
    this.router.navigate(['/admin/update-cemetery', id]);
  }
}
