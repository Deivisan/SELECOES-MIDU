export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'CLT' | 'PJ' | 'Estágio' | 'Temporário'
  modality: 'Presencial' | 'Remoto' | 'Híbrido'
  salary?: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  postedAt: Date
  deadline?: Date
  isActive: boolean
  category: string
}

export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  resumeUrl?: string
  appliedJobs: string[]
  createdAt: Date
}

export interface Application {
  id: string
  candidateId: string
  jobId: string
  status: 'Candidatura Enviada' | 'Em Análise' | 'Entrevista Agendada' | 'Aprovado' | 'Não Aprovado'
  appliedAt: Date
  notes?: string
}

export interface Admin {
  id: string
  name: string
  email: string
  role: 'super_admin' | 'recruiter'
  photoUrl?: string
}
