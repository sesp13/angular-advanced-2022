import { GenericUser } from "./user.model";

export class Hospital {
  constructor(
    public name: string,
    public _id?: string,
    public user?: GenericUser,
    public img?: string,
  ) {}
}