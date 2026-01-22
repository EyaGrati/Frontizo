import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { FrontComponent } from './FrontOffice/front/front.component';
import { NavBackComponent } from './BackOffice/nav-back/nav-back.component';
import { SidebarComponent } from './BackOffice/sidebar/sidebar.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { BackComponent } from './BackOffice/back/back.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddFuneralLocationComponent } from './components/add-funeral-location/add-funeral-location.component';
import { FuneralLocationListComponent } from './components/funeral-location-list/funeral-location-list.component';
import { ReactiveFormsModule } from '@angular/forms';



import { FormsModule } from '@angular/forms';
import { UpdateFuneralLocationComponent } from './components/update-funeral-location/update-funeral-location.component';
import { AddBurrialLocationComponent } from './components/add-burrial-location/add-burrial-location.component';
import { BurrialLocationListComponent } from './components/burrial-location-list/burrial-location-list.component';
import { UpdateBurrialLocationComponent } from './components/update-burrial-location/update-burrial-location.component';
import { AddFlowerComponent } from './components/add-flower/add-flower.component';
import { UpdateFlowerComponent } from './components/update-flower/update-flower.component';
import { FlowerListComponent } from './components/flower-list/flower-list.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { MealsListComponent } from './components/meals-list/meals-list.component';
import { UpdateMealComponent } from './components/update-meal/update-meal.component';
import { AddCeremonyComponent } from './components/add-ceremony/add-ceremony.component';
import { CeremonyListComponent } from './components/ceremony-list/ceremony-list.component';
import { UpdateCeremonyComponent } from './components/update-ceremony/update-ceremony.component';
import { MealSelectorComponent } from './components/meal-selector/meal-selector.component';
import { FlowerSelectorComponent } from './components/flower-selector/flower-selector.component';
import { BurrialSelectorComponent } from './components/burrial-selector/burrial-selector.component';
import { FuneralSelectorComponent } from './components/funeral-selector/funeral-selector.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { SuccessComponent } from './components/success/success.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingComponent } from './components/rating/rating.component';


import { NgxCaptchaModule } from 'ngx-captcha';
import { RecaptchaComponent } from './components/recaptcha/recaptcha.component';
import { AddFArrangementComponent } from './components/add-farrangement/add-farrangement.component';
import { FarrangementListComponent } from './components/farrangement-list/farrangement-list.component';
import { UpdateFarrangementComponent } from './components/update-farrangement/update-farrangement.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlowerStatisticsComponent } from './components/flower-statistics/flower-statistics.component';
import { CalendarComponent } from './components/calendar/calendar.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeFrontComponent,
    FooterFrontComponent,
    FrontComponent,
    HeaderFrontComponent,
    NavBackComponent,
    SidebarComponent,
    FooterBackComponent,
    BackComponent,
    AddFuneralLocationComponent,
   
  FuneralLocationListComponent,
      UpdateFuneralLocationComponent,
      AddBurrialLocationComponent,
      BurrialLocationListComponent,
      UpdateBurrialLocationComponent,
      AddFlowerComponent,
      UpdateFlowerComponent,
      FlowerListComponent,
      AddMealComponent,
      MealsListComponent,
      UpdateMealComponent,
      AddCeremonyComponent,
      CeremonyListComponent,
      UpdateCeremonyComponent,
      MealSelectorComponent,
      FlowerSelectorComponent,
      BurrialSelectorComponent,
      FuneralSelectorComponent,
      PaiementComponent,
      SuccessComponent,
      InvitationComponent,
      RatingComponent,
      RecaptchaComponent,
      AddFArrangementComponent,
      FarrangementListComponent,
      UpdateFarrangementComponent,
      FlowerStatisticsComponent,
      CalendarComponent,
  

      
      
     
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    MatSnackBarModule 
   
    
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
