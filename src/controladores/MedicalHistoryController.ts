import { MedicalRecord, MedicalHistorySummary, VitalSigns } from '../models/MedicalHistory';
import { AuthController } from './AuthController';
import { Patient } from '../modelos/Patient';
import { MedicalHistory } from '../modelos/MedicalHistory';

export class MedicalHistoryController {
  private static records: MedicalRecord[] = [
    {
      id: '1',
      patientId: '1',
      doctorId: '2',
      consultationDate: new Date('2024-06-15'),
      consultationType: 'teleconsulta',
      diagnosis: 'Hipertensión arterial leve',
      symptoms: 'Dolores de cabeza frecuentes, mareos ocasionales',
      treatment: 'Medicación antihipertensiva, cambios en la dieta',
      recommendations: 'Reducir consumo de sal, ejercicio regular 30 min diarios, control mensual',
      medications: [
        {
          name: 'Losartán',
          dosage: '50mg',
          frequency: '1 vez al día',
          duration: '3 meses',
          instructions: 'Tomar en ayunas por la mañana'
        }
      ],
      vitalSigns: {
        bloodPressure: '140/90',
        heartRate: 78,
        temperature: 36.5,
        weight: 75,
        height: 170
      },
      notes: 'Paciente colaborador, buen cumplimiento del tratamiento',
      followUpRequired: true,
      followUpDate: new Date('2024-07-15'),
      status: 'active',
      createdAt: new Date('2024-06-15'),
      updatedAt: new Date('2024-06-15')
    },
    {
      id: '2',
      patientId: '1',
      doctorId: '1',
      consultationDate: new Date('2024-05-20'),
      consultationType: 'presencial',
      diagnosis: 'Gastritis leve',
      symptoms: 'Dolor epigástrico, acidez, náuseas matutinas',
      treatment: 'Inhibidor de bomba de protones, dieta blanda',
      recommendations: 'Evitar alimentos irritantes, comidas pequeñas y frecuentes',
      medications: [
        {
          name: 'Omeprazol',
          dosage: '20mg',
          frequency: '1 vez al día',
          duration: '4 semanas',
          instructions: 'Tomar 30 minutos antes del desayuno'
        }
      ],
      notes: 'Mejoría notable desde la última consulta',
      followUpRequired: false,
      status: 'completed',
      createdAt: new Date('2024-05-20'),
      updatedAt: new Date('2024-05-20')
    }
  ];

  static getMedicalHistory(patientId?: string): MedicalRecord[] {
    const currentUser = AuthController.getCurrentUser();
    if (!currentUser) return [];
    
    if (currentUser.role === 'patient') {
      return this.records
        .filter(record => record.patientId === currentUser.id)
        .sort((a, b) => b.consultationDate.getTime() - a.consultationDate.getTime());
    } else if (currentUser.role === 'doctor') {
      const targetPatientId = patientId || '';
      return this.records
        .filter(record => record.patientId === targetPatientId || record.doctorId === currentUser.id)
        .sort((a, b) => b.consultationDate.getTime() - a.consultationDate.getTime());
    }
    
    return [];
  }

  static addMedicalRecord(record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>): MedicalRecord {
    const newRecord: MedicalRecord = {
      id: Date.now().toString(),
      ...record,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.records.push(newRecord);
    return newRecord;
  }

  static updateMedicalRecord(id: string, updates: Partial<MedicalRecord>): MedicalRecord | null {
    const index = this.records.findIndex(record => record.id === id);
    if (index !== -1) {
      this.records[index] = {
        ...this.records[index],
        ...updates,
        updatedAt: new Date()
      };
      return this.records[index];
    }
    return null;
  }

  static getMedicalSummary(patientId: string): MedicalHistorySummary {
    const patientRecords = this.records.filter(record => record.patientId === patientId);
    
    return {
      patientId,
      totalConsultations: patientRecords.length,
      lastConsultation: patientRecords.length > 0 
        ? new Date(Math.max(...patientRecords.map(r => r.consultationDate.getTime())))
        : undefined,
      chronicConditions: [...new Set(patientRecords
        .filter(r => r.followUpRequired)
        .map(r => r.diagnosis))],
      allergies: [], // Se puede expandir según necesidades
      currentMedications: patientRecords
        .filter(r => r.status === 'active')
        .flatMap(r => r.medications),
      recentDiagnoses: patientRecords
        .slice(0, 5)
        .map(r => r.diagnosis)
    };
  }

  static getRecordById(id: string): MedicalRecord | null {
    return this.records.find(record => record.id === id) || null;
  }
}
