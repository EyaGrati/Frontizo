import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Flower } from 'src/app/model/Flower';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-update-flower',
  templateUrl: './update-flower.component.html',
  styleUrls: ['./update-flower.component.css']
})
export class UpdateFlowerComponent {

  flower: Flower = new Flower();
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  

  constructor(
    private flowerService: FlowerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Convertir 'id' de type string en type number
      const idNum = +id; // Le signe '+' convertit la chaîne en nombre
      this.flowerService.retrieveFlower(idNum).subscribe({
        next: (flower) => {
          this.flower = flower;
          // Autres opérations...
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  updateFlower(): void {
    if (this.flower && this.flower.idFlower) {
      const formData = new FormData();
      formData.append('nomFlower', this.flower.nomFlower);
      formData.append('description', this.flower.description);
     
      formData.append('prixFlower', this.flower.prixFlower.toString());
      
  
      // Ajouter le fichier d'image uniquement s'il y en a un de sélectionné
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      } 
  
      this.flowerService.updateFlower(this.flower.idFlower, formData).subscribe({
        next: () => {
          this.router.navigate(['/admin/flower-list']);
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

