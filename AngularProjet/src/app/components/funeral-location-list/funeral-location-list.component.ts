import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuneralLocation } from 'src/app/model/FuneralLocation';
import { FuneralLocationService } from 'src/app/services/funeral-location.service';
import { Router } from '@angular/router'; // Importez Router d'@angular/router

@Component({
  selector: 'app-funeral-location-list',
  templateUrl: './funeral-location-list.component.html',
  styleUrls: ['./funeral-location-list.component.css']
})
export class FuneralLocationListComponent implements OnInit {
  funeralLocations: FuneralLocation[] = [];

  constructor(private funeralLocationService: FuneralLocationService, private router: Router) { } // Injectez Router dans le constructeur

  ngOnInit(): void {
    this.loadFuneralLocations();
  }

  loadFuneralLocations(): void {
    this.funeralLocationService.retrieveAllFuneralLocations().subscribe({
      next: (funeralLocations: FuneralLocation[]) => {
        this.funeralLocations = funeralLocations;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  deleteFuneralLocation(id: number): void {
    if (confirm('Are you sure you want to delete this funeral location?')) {
      this.funeralLocationService.removeFuneralLocation(id).subscribe({
        next: () => {
          // Remove the deleted location from the list
          this.funeralLocations = this.funeralLocations.filter(location => location.idLoc !== id);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  editFuneralLocation(id: number): void {
    this.router.navigate(['/admin/update-funeral-location', id]);
  }

}
