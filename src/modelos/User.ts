
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  birthDate: string;
  role: 'patient' | 'doctor';
  createdAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  medicalHistory: MedicalRecord[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  availability: TimeSlot[];
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  diagnosis: string;
  treatment: string;
  notes: string;
  prescriptions: string[];
}
