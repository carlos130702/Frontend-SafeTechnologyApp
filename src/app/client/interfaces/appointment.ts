import {ApplianceModel} from "./appliancemodel";
import {Technician} from "../../technician/interfaces/technician";

export interface Appointment {
  id: number;
  clientId: number;
  dateReserved: string;
  dateOfAttention: string;
  hour: string;
  applianceModelId: number;
  applianceModel: ApplianceModel;
  technicianId: number;
  isActive: boolean;
  technician?: Technician;
}
