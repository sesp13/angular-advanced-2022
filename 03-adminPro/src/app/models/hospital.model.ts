interface _HospitalUser {
  name: string;
  img: string;
  _id: string;
}

export class Hospital {
  constructor(
    public name: string,
    public _id?: string,
    public user?: _HospitalUser,
    public img?: string,
  ) {}
}
