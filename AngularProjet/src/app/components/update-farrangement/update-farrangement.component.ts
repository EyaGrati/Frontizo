import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarrangementService } from 'src/app/services/farrangement.service';
import { FArrangement } from 'src/app/model/FArrangement';
@Component({
  selector: 'app-update-farrangement',
  templateUrl: './update-farrangement.component.html',
  styleUrls: ['./update-farrangement.component.css']
})
export class UpdateFarrangementComponent implements OnInit {
    id!: number;
    fArrangement!: FArrangement;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private fArrangementService: FarrangementService
    ) { }
  
    ngOnInit(): void {
      this.fArrangement = new FArrangement();
      this.id = this.route.snapshot.params['id'];
      this.fArrangementService.retrieveFArrangement(this.id).subscribe(
        data => {
          console.log(data);
          this.fArrangement = data;
        },
        error => console.log(error)
      );
    }
  
    updateFArrangement(): void {
      this.fArrangementService.updateFArrangement(this.id, this.fArrangement).subscribe(
        data => {
          console.log(data);
          this.fArrangement = new FArrangement();
          this.goToList();
        },
        error => console.log(error)
      );
    }
  
    onSubmit(): void {
      this.updateFArrangement();
    }
  
    goToList(): void {
      this.router.navigate(['/FarrList']);
    }
  }
