import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteComponent } from 'src/app/alerts/confirm-delete/confirm-delete.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

constructor(
  private snackBar: MatSnackBar,
  private dialog: MatDialog
) { }
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 10000,
    panelClass: ["snackBarStyleSuccess"],
  });
}
openSnackBarError(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 5000,
    panelClass: ["snackBarStyle"],
  });
}
openConfirmDialog(msg) {
  return this.dialog.open(ConfirmDeleteComponent, {
    width: "390px",
    panelClass: "confirm-dialog-container",
    disableClose: false,
    position: { top: "10px" },
    data: {
      message: msg,
    },
  });
}
}
