import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { allowedType } from '../types/upload.type';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(img: string, type: allowedType): string {
    if (img == '') img = 'no-image';
    return img?.includes('https') ? img : `${baseUrl}/uploads/${type}/${img}`;
  }
}
