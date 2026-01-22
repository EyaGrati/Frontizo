import { Component, ViewChild } from '@angular/core';
import { FuneralLocationService } from 'src/app/services/funeral-location.service';
import { NgForm ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuneralLocation } from 'src/app/model/FuneralLocation';
import { TypeLocation } from 'src/app/model/TypeLocation';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-funeral-location',
  templateUrl: './add-funeral-location.component.html',
  styleUrls: ['./add-funeral-location.component.css']
})
export class AddFuneralLocationComponent {
  funeralLocation: FuneralLocation = new FuneralLocation();
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  typeLocationOptions: string[] = Object.values(TypeLocation).map(value => String(value)); // Map enum values to strings

  @ViewChild('funeralLocationForm') funeralLocationForm!: NgForm;

  constructor(private funeralLocationService: FuneralLocationService, private router: Router) {}

  addFuneralLocation(): void {
    if (this.funeralLocationForm.valid) {
      const formData = new FormData();
      formData.append('NameLoc', this.funeralLocation.nameLoc);
      formData.append('FuneralAdress', this.funeralLocation.funeralAdress);
      formData.append('ImgLoc', this.funeralLocation.imgLoc);
      formData.append('priceLoc', this.funeralLocation.priceLoc.toString());
      formData.append('CapacityLoc', this.funeralLocation.capacityLoc.toString());
      formData.append('TypeLocation', this.funeralLocation.typeLocation.toString());

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.funeralLocationService.addFuneralLocation(formData).subscribe({
        next: (Response) => {
          console.log(Response);
          this.router.navigate(['/admin/funeral-location-list'])
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('le formulaire non valide');
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
