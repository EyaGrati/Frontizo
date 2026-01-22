import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormSubmissionService {
  // Assurez-vous que l'URL correspond à l'endpoint exposé par votre backend pour la validation de reCAPTCHA
  private recaptchaValidationUrl = 'http://localhost:8082/test/api/recaptcha/validate';

  constructor(private http: HttpClient) {}

  validateRecaptcha(token: string): Observable<any> {
    // L'objet envoyé dans la requête POST doit correspondre à ce que votre backend attend
    // Par exemple, si votre backend s'attend à recevoir un champ nommé 'token', vous devriez l'envoyer comme ci-dessous
    return this.http.post(this.recaptchaValidationUrl, { token });
  }
}
