
import { apiClient, handleApiError } from './config';

export interface PatientRegistration {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
}

export const patientService = {
  // Crear nuevo paciente
  create: async (patientData: PatientRegistration) => {
    try {
      const response = await apiClient.post('/patients', patientData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Obtener todos los pacientes
  getAll: async () => {
    try {
      const response = await apiClient.get('/patients');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Obtener paciente por ID
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/patients/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
