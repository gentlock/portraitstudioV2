import { Injectable } from '@angular/core';
import { MsgBoxComponent} from "../../../modules/admin/components/msg-box/msg-box.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class ErrHandlerService {

  constructor(
    public dialog: MatDialog,
  ) { }
  // const dialogConfig = new MatDialogConfig();
  // dialogConfig.minHeight  = document.body.clientHeight / 2;
  // dialogConfig.minWidth   = document.body.clientWidth / 2;
  // dialogConfig.data = { content: content }
  //
  // // dialogConfig.disableClose = true;
  // // dialogConfig.autoFocus = true;
  //
  // const dialogRef = this.dialog.open(MsgBoxComponent, dialogConfig);
  //
  // dialogRef.afterClosed().subscribe(result => {
  // console.log(`Dialog result: ${result}`);
// });
}
