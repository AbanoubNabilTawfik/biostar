import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'vex-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  CardWidth:any
  CardHeight:any
  FontStyle:any
  FontSize:any
  FontColor:any
  imgURL:any
  constructor(
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public defaults: any
  ) { }

  ngOnInit(): void {
    console.log(this.defaults);
    
  }

}
