import { Hospital } from "./hospital.model";
import { GenericUser } from "./user.model";


export class Doctor {
  constructor(
    public name: string,
    public _id?: string,
    public user?: GenericUser,
    public hospital?: Hospital,
    public img?: string,
  ) {}
}
