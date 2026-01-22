import { Component, ViewChild } from '@angular/core';
import { Flower } from 'src/app/model/Flower';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlowerService } from 'src/app/services/flower.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-flower',
  templateUrl: './add-flower.component.html',
  styleUrls: ['./add-flower.component.css']
})
export class AddFlowerComponent {

  flower: Flower = new Flower();
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  

  @ViewChild('flowerForm') flowerForm!: NgForm;

  constructor(private flowerService: FlowerService, private router: Router) {}

  addFlower(): void {
    if (this.flowerForm.valid) {
      const formData = new FormData();
      formData.append('nomFlower', this.flower.nomFlower);
      formData.append('prixFlower',this.flower.prixFlower.toString());
    
      formData.append('description', this.flower.description);
    

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.flowerService.addFlower(formData).subscribe({
        next: (Response) => {
          console.log(Response);
          this.router.navigate(['/admin/flower-list'])
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

