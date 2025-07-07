
export interface Doctor {
  id: string;
  nombres: string;
  apellidos: string;
  especialidad: string;
  numeroLicencia: string;
  telefono: string;
  correo: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  medications: Medication[];
  instructions: string;
  date: Date;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}
