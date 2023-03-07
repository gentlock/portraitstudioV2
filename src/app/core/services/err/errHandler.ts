import { inject } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MsgBoxComponent} from "../../../modules/admin/components/msg-box/msg-box.component";
import {HttpErrorResponse} from "@angular/common/http";

//   errBox = errHandler();
//   this.errBox("jakas wiadomosc");
export const errHandler = () => {
  const dialog = inject(MatDialog);

  return (msg: string | HttpErrorResponse) => {

    if (msg instanceof HttpErrorResponse ) {
      msg = msg.message;
    }
    dialog.open(MsgBoxComponent,
      {
        data: {content: msg},
        height: '350px',
        width: '450px',
        position: {bottom: '0px', right: '0px'}
      }
    );
  }
}
