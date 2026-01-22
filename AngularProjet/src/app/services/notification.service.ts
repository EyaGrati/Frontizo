import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(message: string, action: string = 'Close', duration: number = 11000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}
