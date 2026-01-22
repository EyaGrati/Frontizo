import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BurrialLocationService } from 'src/app/services/burrial-location.service';
import { BurrialLocation } from 'src/app/model/BurrialLocation';


@Component({
  selector: 'app-update-burrial-location',
  templateUrl: './update-burrial-location.component.html',
  styleUrls: ['./update-burrial-location.component.css']
})
export class UpdateBurrialLocationComponent {


  burrialLocation: BurrialLocation = new BurrialLocation();
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  

  constructor(
    private burrialLocationService: BurrialLocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Convertir 'id' de type string en type number
      const idNum = +id; // Le signe '+' convertit la chaîne en nombre
      this.burrialLocationService.retrieveBurrialLocation(idNum).subscribe({
        next: (location) => {
          this.burrialLocation = location;
          // Autres opérations...
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  updateBurriallLocation(): void {
    if (this.burrialLocation && this.burrialLocation.idBurrial) {
      const formData = new FormData();
      formData.append('burrialName', this.burrialLocation.burrialName);
      formData.append('burrialAdress', this.burrialLocation.burrialAdress);
     
      formData.append('burrialImg', this.burrialLocation.burrialImg.toString());
      
  
      // Ajouter le fichier d'image uniquement s'il y en a un de sélectionné
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      } 
  
      this.burrialLocationService.updateBurrialLocation(this.burrialLocation.idBurrial, formData).subscribe({
        next: () => {
          this.router.navigate(['/admin/cemetery-list']);
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Form is not valid or location ID is missing');
    }
  }
  

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file: File = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
}

