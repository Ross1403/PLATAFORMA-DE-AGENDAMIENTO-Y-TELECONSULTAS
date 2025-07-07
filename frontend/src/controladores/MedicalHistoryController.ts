
import { MedicalRecord, MedicalHistory, MedicalHistorySummary } from '../modelos/MedicalHistory';

export class MedicalHistoryController {
  private static records: MedicalRecord[] = [];

  static getMedicalHistory(): MedicalRecord[] {
    return this.records;
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

  static getPatientHistory(patientId: string): MedicalHistory {
    const patientRecords = this.records.filter(record => record.patientId === patientId);
    
    const summary: MedicalHistorySummary = {
      patientId,
      totalConsultations: patientRecords.length,
      lastConsultation: patientRecords.length > 0 ? patientRecords[patientRecords.length - 1].consultationDate : undefined,
      chronicConditions: [],
      allergies: [],
      currentMedications: [],
      recentDiagnoses: patientRecords.slice(-3).map(r => r.diagnosis)
    };

    return {
      records: patientRecords,
      summary
    };
  }
}
