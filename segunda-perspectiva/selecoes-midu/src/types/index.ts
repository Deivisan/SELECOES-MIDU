export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'CLT' | 'PJ' | 'Estágio' | 'Temporário';
  modality: 'Presencial' | 'Remoto' | 'Híbrido';
  salary?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedAt: Date;
  deadline?: Date;
  isActive: boolean;
  category: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  bio?: string;
  resumeUrl?: string;
  appliedJobs: string[];
  createdAt: Date;
}

export interface Application {
  id: string;
  candidateId: string;
  jobId: string;
  status: 'Candidatura Enviada' | 'Em Análise' | 'Entrevista Agendada' | 'Aprovado' | 'Não Aprovado';
  appliedAt: Date;
  notes?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  location: string;
  size: 'Pequena' | 'Média' | 'Grande';
  sector: string;
}

export type CategoryFilter = 'Todas' | 'Tecnologia' | 'Saúde' | 'Educação' | 'Vendas' | 'Marketing' | 'Finanças' | 'RH';

export type JobType = Job['type'];
export type JobModality = Job['modality'];
export type ApplicationStatus = Application['status'];