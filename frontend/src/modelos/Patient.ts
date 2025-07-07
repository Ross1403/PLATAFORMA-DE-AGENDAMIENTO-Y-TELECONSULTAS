
export interface PatientRegistration {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
}

export interface Patient extends PatientRegistration {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
