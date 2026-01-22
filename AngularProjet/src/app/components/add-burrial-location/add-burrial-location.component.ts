import { Component, ViewChild } from '@angular/core';
import { BurrialLocationService } from 'src/app/services/burrial-location.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BurrialLocation } from 'src/app/model/BurrialLocation';
import { TypeLocation } from 'src/app/model/TypeLocation';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-burrial-location',
  templateUrl: './add-burrial-location.component.html',
  styleUrls: ['./add-burrial-location.component.css']
})
export class AddBurrialLocationComponent {


  burrialLocation: BurrialLocation = new BurrialLocation();
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  

  @ViewChild('burrialLocationForm') burrialLocationForm!: NgForm;

  constructor(private burrialLocationService: BurrialLocationService, private router: Router) {}

  addBurrialLocation(): void {
    if (this.burrialLocationForm.valid) {
      const formData = new FormData();
      formData.append('BurrialAdress', this.burrialLocation.burrialAdress);
      formData.append('BurrialName',this.burrialLocation.burrialName)
    
      formData.append('BurrialImg', this.burrialLocation.burrialImg);
    

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.burrialLocationService.addBurrialLocation(formData).subscribe({
        next: (Response) => {
          console.log(Response);
          this.router.navigate(['/admin/cemetery-list'])
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
  toggleChat(): void {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
    }
  }
  


}

