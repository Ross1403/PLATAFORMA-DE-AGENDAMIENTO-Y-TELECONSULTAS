
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  time: string;
  type: 'teleconsulta' | 'presencial';
  status: 'programada' | 'completada' | 'cancelada';
  reason?: string;
  meetingLink?: string;
  createdAt?: Date;
}
