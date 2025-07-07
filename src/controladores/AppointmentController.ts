import { Appointment, AppointmentRequest } from '../modelos/Appointment';
import { AuthController } from './AuthController';

export class AppointmentController {
  private static appointments: Appointment[] = [
    {
      id: '1',
      patientId: '1',
      doctorId: '2',
      date: new Date('2024-07-10'),
      time: '10:00',
      type: 'teleconsulta',
      status: 'programada',
      meetingLink: 'https://meet.google.com/abc-def-ghi',
      createdAt: new Date()
    }
  ];

  static async createAppointment(request: AppointmentRequest): Promise<Appointment> {
    const currentUser = AuthController.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      patientId: currentUser.id,
      doctorId: request.doctorId,
      date: new Date(request.date),
      time: request.time,
      type: request.type,
      status: 'programada',
      notes: request.notes,
      meetingLink: request.type === 'teleconsulta' ? `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}` : undefined,
      createdAt: new Date()
    };

    this.appointments.push(newAppointment);
    return newAppointment;
  }

  static getAppointments(): Appointment[] {
    const currentUser = AuthController.getCurrentUser();
    if (!currentUser) return [];
    
    return this.appointments.filter(apt => 
      apt.patientId === currentUser.id || apt.doctorId === currentUser.id
    );
  }

  static getAvailableSlots(doctorId: string, date: string): string[] {
    // Simulación de horarios disponibles
    const allSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
    const bookedSlots = this.appointments
      .filter(apt => apt.doctorId === doctorId && apt.date.toDateString() === new Date(date).toDateString())
      .map(apt => apt.time);
    
    return allSlots.filter(slot => !bookedSlots.includes(slot));
  }
}
