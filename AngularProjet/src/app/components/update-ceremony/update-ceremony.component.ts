import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Ceremony } from 'src/app/model/Ceremony';
import { CeremonyService } from 'src/app/services/ceremony.service';

@Component({
  selector: 'app-update-ceremony',
  templateUrl: './update-ceremony.component.html',
  styleUrls: ['./update-ceremony.component.css']
})
export class UpdateCeremonyComponent {

  ceremony: Ceremony = new Ceremony(); // Assume Ceremony has a default constructor
  id!: number;

  constructor(
    private ceremonyService: CeremonyService, 
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; // Assuming you're using route parameters to pass the id
    this.ceremonyService.retrieveCeremony(this.id).subscribe({
      next: (data) => {
        this.ceremony = data;
      },
      error: (err) => console.error(err)
    });
  }

  updateCeremony(form: NgForm): void {
    if (form.valid) {
      this.ceremonyService.updateCeremony(this.id, this.ceremony).subscribe({
        next: (updatedCeremony) => {
          console.log(updatedCeremony);
          this.router.navigate(['/admin/ceremony-list']); // Adjust the route as per your routing configuration
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}
