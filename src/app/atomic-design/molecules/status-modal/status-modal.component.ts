import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { icons } from 'src/app/util/icons.enum';

@Component({
  selector: 'molecule-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent {
  icon_close = icons.CLOSE;

  constructor(public dialogRef: MatDialogRef<StatusModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  close(): void {
    this.dialogRef.close();
  }

}
