import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { allowedType } from '../types/upload.type';

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  private _hideModal: boolean = true;
  private baseUrl = environment.baseUrl;
  private uploadsUrl = `${this.baseUrl}/uploads`;

  type?: allowedType;
  id?: string;
  img?: any  = null;

  newImage: EventEmitter<string> = new EventEmitter<string>();
  modalOpened: EventEmitter<string> = new EventEmitter<string>();

  get hideModal() {
    return this._hideModal;
  }

  constructor() {}

  openModal(type: allowedType, id: string, img: string = 'no-image'): void {
    this.modalOpened.emit();
    this._hideModal = false;
    this.type = type;
    this.id = id;
    if (img?.includes('https')) {
      this.img = img;
    } else {
      this.img = `${this.uploadsUrl}/${this.type}/${img}`;
    }
  }

  closeModal(): void {
    this._hideModal = true;
    this.img = null;
  }
}
