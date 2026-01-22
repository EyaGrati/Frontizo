import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FuneralLocationService } from 'src/app/services/funeral-location.service';
import { FuneralLocation } from 'src/app/model/FuneralLocation';
import { TypeLocation } from 'src/app/model/TypeLocation';

@Component({
  selector: 'app-update-funeral-location',
  templateUrl: './update-funeral-location.component.html',
  styleUrls: ['./update-funeral-location.component.css']
})
export class UpdateFuneralLocationComponent implements OnInit {
  funeralLocation: FuneralLocation = new FuneralLocation();
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  typeLocationOptions: string[] = Object.values(TypeLocation).map(value => String(value));

  constructor(
    private funeralLocationService: FuneralLocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Convertir 'id' de type string en type number
      const idNum = +id; // Le signe '+' convertit la chaîne en nombre
      this.funeralLocationService.retrieveFuneralLocation(idNum).subscribe({
        next: (location) => {
          this.funeralLocation = location;
          // Autres opérations...
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  updateFuneralLocation(): void {
    if (this.funeralLocation && this.funeralLocation.idLoc) {
      const formData = new FormData();
      formData.append('NameLoc', this.funeralLocation.nameLoc);
      formData.append('FuneralAdress', this.funeralLocation.funeralAdress);
     
      formData.append('PriceLoc', this.funeralLocation.priceLoc.toString());
      formData.append('CapacityLoc', this.funeralLocation.capacityLoc.toString());
      formData.append('TypeLocation', this.funeralLocation.typeLocation.toString());
  
      // Ajouter le fichier d'image uniquement s'il y en a un de sélectionné
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      } 
  
      this.funeralLocationService.updateFuneralLocation(this.funeralLocation.idLoc, formData).subscribe({
        next: () => {
          this.router.navigate(['/admin/funeral-location-list']);
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
