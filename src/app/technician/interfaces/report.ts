export interface Report {
  id: number;
  appointmentId: number;
  technicianId: number;
  technician:{ username: string;
    cellPhoneNumber: string;
    names: string;
    lastNames: string;
    address: string;
    email: string;
    password: string;};
  observation: string;
  diagnosis:string;
  repairDescription:string;
  date:string;
  status: boolean;
  appointment?: any;
}
