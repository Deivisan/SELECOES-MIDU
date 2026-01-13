import { Job } from '@/types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Desenvolvedor Frontend Senior',
    company: 'Tech Solutions Brasil',
    location: 'São Paulo, SP',
    type: 'CLT',
    modality: 'Híbrido',
    salary: 'R$ 12.000 - R$ 15.000',
    description: 'Buscamos um desenvolvedor frontend senior para liderar projetos inovadores usando tecnologias de ponta.',
    requirements: [
      '5+ anos de experiência em React/Next.js',
      'Experiência com TypeScript',
      'Conhecimento em design systems',
      'Inglês avançado'
    ],
    responsibilities: [
      'Desenvolver componentes reutilizáveis',
      'Liderar equipes técnicas',
      'Code review e mentoring',
      'Participar de decisões de arquitetura'
    ],
    benefits: [
      'Plano de saúde e odontológico',
      'Auxílio educação',
      'Flexibilidade de horário',
      'Trabalho remoto 3x na semana'
    ],
    postedAt: new Date('2024-01-10'),
    deadline: new Date('2024-02-10'),
    isActive: true,
    category: 'Tecnologia'
  },
  {
    id: '2',
    title: 'Enfermeiro(a) UTI',
    company: 'Hospital São Lucas',
    location: 'Rio de Janeiro, RJ',
    type: 'CLT',
    modality: 'Presencial',
    salary: 'R$ 8.000 - R$ 10.000',
    description: 'Procuramos profissionais de enfermagem dedicados para nossa UTI adulto.',
    requirements: [
      'Formação em Enfermagem',
      'Registro ativo no COREN',
      'Experiência em UTI',
      'Residência em enfermagem (diferencial)'
    ],
    responsibilities: [
      'Assistência ao paciente crítico',
      'Administração de medicamentos',
      'Monitoramento de sinais vitais',
      'Documentação clínica'
    ],
    benefits: [
      'Plano de saúde premium',
      'Seguro de vida',
      'Auxílio transporte',
      'Bônus por produtividade'
    ],
    postedAt: new Date('2024-01-08'),
    deadline: new Date('2024-01-25'),
    isActive: true,
    category: 'Saúde'
  },
  {
    id: '3',
    title: 'Professor de Matemática',
    company: 'Colégio Elite',
    location: 'Belo Horizonte, MG',
    type: 'CLT',
    modality: 'Presencial',
    salary: 'R$ 4.000 - R$ 6.000',
    description: 'Buscamos professor apaixonado por matemática para inspirar nossos alunos.',
    requirements: [
      'Licenciatura em Matemática',
      'Experiência com ensino médio',
      'Conhecimento em metodologias ativas',
      'Boa comunicação'
    ],
    responsibilities: [
      'Planejar e ministrar aulas',
      'Elaborar avaliações',
      'Participar de reuniões pedagógicas',
      'Atender pais e alunos'
    ],
    benefits: [
      'Plano de saúde',
      'Auxílio alimentação',
      'Reciclagem profissional',
      'Férias remuneradas'
    ],
    postedAt: new Date('2024-01-12'),
    deadline: new Date('2024-02-05'),
    isActive: true,
    category: 'Educação'
  },
  {
    id: '4',
    title: 'Vendedor Pleno',
    company: 'Sales Force Brasil',
    location: 'Porto Alegre, RS',
    type: 'CLT',
    modality: 'Remoto',
    salary: 'R$ 5.000 + comissões',
    description: 'Oportunidade para vendedores que buscam crescimento e alto potencial de ganhos.',
    requirements: [
      'Experiência em vendas B2B',
      'Excelente comunicação',
      'Metas orientadas a resultados',
      'Conhecimento em CRM'
    ],
    responsibilities: [
      'Prospectar clientes',
      'Apresentar produtos',
      'Negociar contratos',
      'Manter relacionamento'
    ],
    benefits: [
      'Comissão atrativa',
      'Plano de carreira',
      'Treinamento constante',
      'Trabalho 100% remoto'
    ],
    postedAt: new Date('2024-01-11'),
    deadline: new Date('2024-02-15'),
    isActive: true,
    category: 'Vendas'
  },
  {
    id: '5',
    title: 'Coordenador de Marketing',
    company: 'Digital Agency',
    location: 'Curitiba, PR',
    type: 'CLT',
    modality: 'Híbrido',
    salary: 'R$ 8.000 - R$ 12.000',
    description: 'Líder para gerenciar estratégias de marketing digital da equipe.',
    requirements: [
      'Graduação em Marketing ou áreas',
      '5+ anos de experiência',
      'Inglês intermediário',
      'Conhecimento em ferramentas digitais'
    ],
    responsibilities: [
      'Planejar campanhas',
      'Gerenciar equipe',
      'Analisar métricas',
      'Desenvolver estratégias'
    ],
    benefits: [
      'Auxílio educação',
      'Plano de saúde',
      'Participação nos lucros',
      'Flexibilidade de horário'
    ],
    postedAt: new Date('2024-01-09'),
    deadline: new Date('2024-02-01'),
    isActive: true,
    category: 'Marketing'
  }
];

export const mockCompanies = [
  {
    id: '1',
    name: 'Tech Solutions Brasil',
    logo: '/companies/tech-solutions.svg',
    description: 'Empresa líder em soluções tecnológicas para o mercado brasileiro.',
    website: 'https://techsolutions.com.br',
    location: 'São Paulo, SP',
    size: 'Grande',
    sector: 'Tecnologia'
  },
  {
    id: '2',
    name: 'Hospital São Lucas',
    logo: '/companies/hospital.svg',
    description: 'Referência em saúde com excelência no atendimento humano.',
    website: 'https://saolucas.com.br',
    location: 'Rio de Janeiro, RJ',
    size: 'Grande',
    sector: 'Saúde'
  }
];