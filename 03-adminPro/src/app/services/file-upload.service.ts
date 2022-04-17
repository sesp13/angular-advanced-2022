import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { allowedType } from '../types/upload.type';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl = environment.baseUrl;
  private uploadsUrl = `${this.baseUrl}/uploads`;

  constructor() {}

  async uploadPhoto(
    file: File,
    type: allowedType,
    id: string
  ): Promise<any> {
    try {
      const url = `${this.uploadsUrl}/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const response: Response = await fetch(url, {
        method: 'PUT',
        headers: { 'x-token': localStorage.getItem('token') || '' },
        body: formData,
      });
      // Get the body provided by the response
      const data = await response.json();
      return data.ok ? data.filename : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
