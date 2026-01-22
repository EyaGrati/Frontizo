import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms'; // Importez FormBuilder, FormGroup et Validators depuis @angular/forms


@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.css']
})
export class RecaptchaComponent implements OnInit {
  protected aFormGroup!: FormGroup; // Assurez-vous d'importer FormGroup

  siteKey: string= "6LeIrrwpAAAAANLwPoTWV6ZCeaZZpB1F8iu7UnhX";
  constructor(private formBuilder: FormBuilder) {} // Assurez-vous d'importer FormBuilder

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required] // Assurez-vous d'importer Validators
    });
  }
}
