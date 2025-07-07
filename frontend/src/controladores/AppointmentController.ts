
import { appointmentService } from '../api/appointmentService';

export class AppointmentController {
  private static appointments: any[] = [];

  static async createAppointment(appointmentData: any) {
    try {
      const newAppointment = await appointmentService.create(appointmentData);
      this.appointments.push(newAppointment);
      return newAppointment;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  static async getAppointments() {
    try {
      const appointments = await appointmentService.getAll();
      this.appointments = appointments;
      return appointments;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // Fallback para demo
      return this.appointments;
    }
  }
}
