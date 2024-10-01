import {Technician} from "./technician";
import {Appointment} from "../../client/interfaces/appointment";

export interface Report {
  id: number;
  appointmentId: number;
  technicianId: number;
  technician: Technician;
  observation: string;
  diagnosis: string;
  repairDescription: string;
  date: string;
  isActive: boolean;
  appointment?: Appointment;
}
