import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private modalRef: BsModalRef | undefined;

  constructor(private modalService: BsModalService) {}

  open(title: string, message: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const initialState = {
        title,
        message,
      };

      this.modalRef = this.modalService.show(ConfirmDialogComponent, { initialState });

      this.modalRef.content.confirmed.subscribe(() => {
        this.modalRef?.hide();
        resolve();
      });

      this.modalRef.content.cancelled.subscribe(() => {
        this.modalRef?.hide();
      });
    });
  }
}
