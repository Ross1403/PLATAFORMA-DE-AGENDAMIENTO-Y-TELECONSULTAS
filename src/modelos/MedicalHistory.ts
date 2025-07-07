
export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  consultationDate: Date;
  consultationType: 'presencial' | 'teleconsulta';
  diagnosis: string;
  symptoms: string;
  treatment: string;
  recommendations: string;
  medications: Medication[];
  vitalSigns?: VitalSigns;
  notes: string;
  followUpRequired: boolean;
  followUpDate?: Date;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface VitalSigns {
  bloodPressure?: string;
  heartRate?: number;
  temperature?: number;
  weight?: number;
  height?: number;
}

export interface MedicalHistorySummary {
  patientId: string;
  totalConsultations: number;
  lastConsultation?: Date;
  chronicConditions: string[];
  allergies: string[];
  currentMedications: Medication[];
  recentDiagnoses: string[];
}
