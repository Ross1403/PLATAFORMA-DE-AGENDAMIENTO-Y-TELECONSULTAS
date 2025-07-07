
import { apiClient, handleApiError } from './config';

export const doctorService = {
  // Obtener todos los doctores
  getAll: async () => {
    try {
      const response = await apiClient.get('/doctors');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Crear nuevo doctor
  create: async (doctorData: any) => {
    try {
      const response = await apiClient.post('/doctors', doctorData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
