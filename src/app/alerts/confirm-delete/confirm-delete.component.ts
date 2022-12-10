import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'vex-confirm-delete',
templateUrl: './confirm-delete.component.html',
styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>) { }

  ngOnInit() 
  {
  }

  closeDialog() 
  {
    this.dialogRef.close(false);
  }

  confirm(bool:boolean)
  {
    if(bool == false)
    {
      this.dialogRef.close(false);
    }
    else
    {
      this.dialogRef.close(true);
    }
  }

}
