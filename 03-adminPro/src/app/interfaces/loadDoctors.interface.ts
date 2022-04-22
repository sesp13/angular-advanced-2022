import { Doctor } from "../models/doctor.model";

export interface LoadDoctors {
  ok?: boolean;
  msg?: string;
  doctors?: Doctor[];
}
export interface LoadDoctor {
  ok?: boolean;
  msg?: string;
  doctor?: Doctor;
}