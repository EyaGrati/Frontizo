import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';
import { CeremonyService } from 'src/app/services/ceremony.service';
import { Router } from '@angular/router';
import { Ceremony } from 'src/app/model/Ceremony';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  public totalPriceOfFlowers: number = 0;
  public PriceOfFuneralLoc: number = 0;
  public totalPriceOfMeals: number = 0;
  public nom!: string;
  public prenom!: string;
  public Funeraldate!: Date;
  public nbreofguests!: number;
  public id!: number; // Définir la propriété id ici

  constructor(
    private appStateService: AppStateService,
    private ceremonyService: CeremonyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appStateService.currentCeremonyId$.subscribe(id => {
      if (id !== null) {
        this.id = id; // Initialiser la propriété id avec la valeur reçue
        this.ceremonyService.retrieveCeremony(id).subscribe(ceremony => {
          this.nom = ceremony.nom;
          this.prenom = ceremony.prenom;
          this.Funeraldate = ceremony.dateFuneral;
          this.nbreofguests = ceremony.nbrInvite;
          this.calculateTotalPriceOfFlowers(ceremony);
          this.calculatePriceOfFuneralLoc(ceremony);
          this.calculateTotalPriceOfMeals(ceremony);
        });
      }
    });
  }
  private calculateTotalPriceOfFlowers(ceremony: Ceremony): void {
    console.log("Calculating total price for flowers in ceremony:", ceremony);
    if (ceremony.flowers && ceremony.flowers.length > 0) {
      this.totalPriceOfFlowers = ceremony.flowers.reduce((acc, flower) => acc + flower.prixFlower, 0);
    } else {
      this.totalPriceOfFlowers = 0; // Réinitialiser si aucune fleur n'est associée
    }
    console.log("Total price of flowers:", this.totalPriceOfFlowers);
    console.log("Flowers in ceremony:", ceremony.flowers);

  }

  private calculateTotalPriceOfMeals(ceremony: Ceremony): void {
    console.log("Calculating total price for meals in ceremony:", ceremony);
    if (ceremony.meals && ceremony.meals.length > 0) {
      this.totalPriceOfMeals = ceremony.meals.reduce((acc, meal) => acc + meal.prixMeals, 0);
    } else {
      this.totalPriceOfMeals = 0; // Réinitialiser si aucune fleur n'est associée
    }
    console.log("Total price of meals:", this.totalPriceOfMeals);
    console.log("meals in ceremony:", ceremony.meals);

  }

  private calculatePriceOfFuneralLoc(ceremony: Ceremony): void {
    console.log("Calculating  price of funeral location :", ceremony);
    if (ceremony.funeralLocations && ceremony.funeralLocations.length > 0) {
      this.PriceOfFuneralLoc = ceremony.funeralLocations.reduce((acc, funeral) => acc + funeral.priceLoc, 0);
    } else {
      this.PriceOfFuneralLoc = 0; // Réinitialiser si aucune fleur n'est associée
    }
    console.log("Total price of funeral locations:", this.PriceOfFuneralLoc);
    console.log("funeral locations  in ceremony:", ceremony.funeralLocations);

  }
  
  confirmPayment(): void {
    this.router.navigate(['/success']);
  }


  downloadPDF(): void {
    html2canvas(this.pdfContent.nativeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
      });
      const imgHeight = canvas.height * 208 / canvas.width;
      pdf.addImage(imgData, 0, 0, 208, imgHeight);
      pdf.save('payment-receipt.pdf');
    });
  }

  invit(): void {
    if (this.id !== undefined) {
      this.router.navigate(['/invit', this.id ]); // Utiliser id correctement
    } else {
      console.error("ID is undefined. Unable to navigate to invitation.");
    }
  }
}
