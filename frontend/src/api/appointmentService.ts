
import { apiClient, handleApiError } from './config';

export const appointmentService = {
  // Obtener todas las citas
  getAll: async () => {
    try {
      const response = await apiClient.get('/appointments');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Crear nueva cita
  create: async (appointmentData: any) => {
    try {
      const response = await apiClient.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
