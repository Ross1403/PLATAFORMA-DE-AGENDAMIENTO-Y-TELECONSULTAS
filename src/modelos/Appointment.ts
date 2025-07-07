
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  time: string;
  type: 'presencial' | 'teleconsulta';
  status: 'programada' | 'completada' | 'cancelada';
  notes?: string;
  meetingLink?: string;
  createdAt: Date;
}

export interface AppointmentRequest {
  doctorId: string;
  date: string;
  time: string;
  type: 'presencial' | 'teleconsulta';
  notes?: string;
}
