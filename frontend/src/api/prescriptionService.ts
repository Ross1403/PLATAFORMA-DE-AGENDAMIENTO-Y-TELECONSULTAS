
import { apiClient, handleApiError } from './config';

export const prescriptionService = {
  // Obtener todas las recetas
  getAll: async () => {
    try {
      const response = await apiClient.get('/prescriptions');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Crear nueva receta
  create: async (prescriptionData: any) => {
    try {
      const response = await apiClient.post('/prescriptions', prescriptionData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Obtener recetas por paciente
  getByPatient: async (patientId: string) => {
    try {
      const response = await apiClient.get(`/prescriptions/patient/${patientId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
