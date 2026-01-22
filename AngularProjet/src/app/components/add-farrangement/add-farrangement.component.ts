import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FarrangementService } from 'src/app/services/farrangement.service';
import { FArrangement } from 'src/app/model/FArrangement';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-add-farrangement',
  templateUrl: './add-farrangement.component.html',
  styleUrls: ['./add-farrangement.component.css']
})
export class AddFArrangementComponent {
  fArrangement: FArrangement = new FArrangement();
  submitted = false;
  notificationMessage: string = '';
  showingNotification: boolean = false;

  constructor(private fArrangementService: FarrangementService, private router: Router,private notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  saveFArrangement(): void {
    this.fArrangementService.addFArrangement(this.fArrangement)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(["/FarrList"]);
          this.notificationService.showNotification(`Step: ${this.fArrangement.step} - Status: ${this.fArrangement.statut}`);
        },
        error => {
          console.log(error);
        });
  }
  
  newFArrangement(): void {
    this.submitted = false;
    this.fArrangement = new FArrangement();
  }

  showNotification() {
    this.notificationMessage = `Step ${this.fArrangement.step} - Status: ${this.fArrangement.statut}`;
    this.showingNotification = true;
    setTimeout(() => {
      this.hideNotification();
    }, 5000); // Cacher la notification après 5 secondes
  }
  

  hideNotification() {
    this.showingNotification = false;
  }




}
