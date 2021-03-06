import { environment } from 'src/environments/environment';
import { userRole } from '../types/userRole.type';

const baseUrl = environment.baseUrl;

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: userRole,
    public uid?: string
  ) {}

  get imageUrl(): string {
    return this.img?.includes('https')
      ? this.img
      : `${baseUrl}/uploads/users/${this.img}`;
  }
}

export interface GenericUser{
  name: string;
  img: string;
  _id: string;
}