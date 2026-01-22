import { Component, OnInit } from '@angular/core';
import { FarrangementService } from 'src/app/services/farrangement.service';
import { FArrangement } from 'src/app/model/FArrangement';
import { Router } from '@angular/router';
@Component({
  selector: 'app-farrangement-list',
  templateUrl: './farrangement-list.component.html',
  styleUrls: ['./farrangement-list.component.css']
})
export class FarrangementListComponent {

  fArrangements!: FArrangement[];
  

  constructor(private fArrangementService: FarrangementService ,private router: Router) { }

  ngOnInit(): void {
    this.retrieveAllFArrangements();
  }

  retrieveAllFArrangements(): void {
    this.fArrangementService.retrieveAllFArrangements().subscribe(
      data => {
        this.fArrangements = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  removeFArrangement(id: number): void {
    if (confirm('Are you sure you want to delete this burial location?')) {
      this.fArrangementService.removeFArrangement(id).subscribe({
        next: () => {
          // Remove the deleted location from the list
          this.fArrangements = this.fArrangements.filter(arrangement => arrangement.idArrangement !== id);
        },
        error: (error) => {
          console.error('Error deleting the burial location:', error);
        }
      });
    }
  }

  editFarrang(id: number): void {
    this.router.navigate(['/UpdateFArr', id]);
   
  }
  

}
