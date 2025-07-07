import { Doctor, Prescription } from '../modelos/Doctor';

export class DoctorController {
  private static doctors: Doctor[] = [
    {
      id: '1',
      nombres: 'Juan Carlos',
      apellidos: 'Pérez García',
      especialidad: 'Medicina General',
      numeroLicencia: 'CMP-12345',
      telefono: '555-0001',
      correo: 'dr.perez@hospital.com'
    },
    {
      id: '2',
      nombres: 'María Elena',
      apellidos: 'González López',
      especialidad: 'Cardiología',
      numeroLicencia: 'CMP-12346',
      telefono: '555-0002',
      correo: 'dra.gonzalez@hospital.com'
    },
    {
      id: '3',
      nombres: 'Roberto',
      apellidos: 'Martínez Silva',
      especialidad: 'Neurología',
      numeroLicencia: 'CMP-12347',
      telefono: '555-0003',
      correo: 'dr.martinez@hospital.com'
    }
  ];

  private static prescriptions: Prescription[] = [];

  static getAllDoctors(): Doctor[] {
    return this.doctors;
  }

  static getDoctor(id: string): Doctor | null {
    return this.doctors.find(doctor => doctor.id === id) || null;
  }

  static createPrescription(prescription: Omit<Prescription, 'id'>): Prescription {
    const newPrescription: Prescription = {
      id: Date.now().toString(),
      ...prescription
    };
    
    this.prescriptions.push(newPrescription);
    return newPrescription;
  }

  static getPrescriptionsByPatient(patientId: string): Prescription[] {
    return this.prescriptions.filter(prescription => prescription.patientId === patientId);
  }
}
