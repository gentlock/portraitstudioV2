import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-msg-box',
  templateUrl: './msg-box.component.html',
  styleUrls: ['./msg-box.component.scss']
})
export class MsgBoxComponent {
  cnt = "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {content: string},
  ) {
    this.cnt = this.data.content;
  }
}
