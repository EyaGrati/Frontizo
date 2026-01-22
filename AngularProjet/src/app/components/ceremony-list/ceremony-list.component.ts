import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ceremony } from 'src/app/model/Ceremony';
import { CeremonyService } from 'src/app/services/ceremony.service';
import { Router } from '@angular/router'; // Importez Router d'@angular/router


@Component({
  selector: 'app-ceremony-list',
  templateUrl: './ceremony-list.component.html',
  styleUrls: ['./ceremony-list.component.css']
})
export class CeremonyListComponent {

 

  Ceremonies: Ceremony[] = [];
 


  constructor(private ceremonyService: CeremonyService, private router: Router) {}

  ngOnInit(): void {
    this.loadCeremonies();
  }

  loadCeremonies(): void {
    this.ceremonyService.retrieveAllCeremonies().subscribe({
      next: (ceremonies: Ceremony[]) => {
        this.Ceremonies = ceremonies;
       
      },
      error: (error) => {
        console.error('There was an error retrieving the ceremonies:', error);
      }
    });
  }

  deleteCeremonies(id: number): void {
    if (confirm('Are you sure you want to delete this burial location?')) {
      this.ceremonyService.removeCeremony(id).subscribe({
        next: () => {
          // Remove the deleted location from the list
          this.Ceremonies = this.Ceremonies.filter(ceremony => ceremony.idCer !== id);
        },
        error: (error) => {
          console.error('Error deleting the burial location:', error);
        }
      });
    }
  }

  editCeremony(id: number): void {
    this.router.navigate(['/update-ceremony', id]);
   
  }
}

