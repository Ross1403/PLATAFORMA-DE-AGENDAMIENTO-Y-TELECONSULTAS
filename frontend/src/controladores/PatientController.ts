
import { PatientRegistration, Patient } from '../modelos/Patient';

export class PatientController {
  private static patients: Patient[] = [];

  static registerPatient(data: PatientRegistration): Patient {
    const newPatient: Patient = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.patients.push(newPatient);
    return newPatient;
  }

  static getPatient(id: string): Patient | null {
    return this.patients.find(patient => patient.id === id) || null;
  }

  static getAllPatients(): Patient[] {
    return this.patients;
  }

  static updatePatient(id: string, data: Partial<Patient>): Patient | null {
    const index = this.patients.findIndex(patient => patient.id === id);
    if (index !== -1) {
      this.patients[index] = { ...this.patients[index], ...data, updatedAt: new Date() };
      return this.patients[index];
    }
    return null;
  }
}
