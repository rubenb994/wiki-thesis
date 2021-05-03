import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  dialogData: DialogData;
  iFrameUrl: SafeUrl;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    private domSanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.dialogData = data;
  }

  ngOnInit(): void {
    this.iFrameUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.dialogData.iFrame
    );
  }
}
export interface DialogData {
  iFrame: string;
  title: string;
  text: string;
}
