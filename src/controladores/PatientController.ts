import { PatientData, PatientRegistration } from '../modelos/Patient';

export class PatientController {
  private static patients: PatientData[] = [];

  static registerPatient(data: PatientRegistration): PatientData {
    const newPatient: PatientData = {
      id: Date.now().toString(),
      ...data
    };
    
    this.patients.push(newPatient);
    return newPatient;
  }

  static getPatient(id: string): PatientData | null {
    return this.patients.find(patient => patient.id === id) || null;
  }

  static getAllPatients(): PatientData[] {
    return this.patients;
  }

  static updatePatient(id: string, data: Partial<PatientData>): PatientData | null {
    const index = this.patients.findIndex(patient => patient.id === id);
    if (index !== -1) {
      this.patients[index] = { ...this.patients[index], ...data };
      return this.patients[index];
    }
    return null;
  }
}
