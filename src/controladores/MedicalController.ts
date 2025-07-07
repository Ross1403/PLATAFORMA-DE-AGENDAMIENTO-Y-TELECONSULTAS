import { MedicalRecord } from '../modelos/MedicalHistory';
import { MedicalHistoryController } from './MedicalHistoryController';

export class MedicalController {
  static getMedicalHistory(): MedicalRecord[] {
    return MedicalHistoryController.getMedicalHistory();
  }

  static addMedicalRecord(record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>): MedicalRecord {
    return MedicalHistoryController.addMedicalRecord(record);
  }
}
