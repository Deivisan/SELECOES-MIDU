'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/types';
import { Search, Filter, X, MapPin, DollarSign, Clock } from 'lucide-react';

interface JobFilters {
  search: string;
  category: string;
  type: string;
  modality: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
}

interface JobListProps {
  initialJobs: Job[];
}

export default function JobList({ initialJobs }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    category: '',
    type: '',
    modality: '',
    location: '',
    salaryMin: '',
    salaryMax: ''
  });
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`/api/jobs?${queryParams}`);
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      type: '',
      modality: '',
      location: '',
      salaryMin: '',
      salaryMax: ''
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls - Editorial */}
      <div 
        className="art-deco-border p-8"
        style={{ 
          background: 'white',
          borderColor: 'var(--charcoal-700)'
        }}
      >
        <div className="flex gap-4 items-center mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--charcoal-400)' }} />
            <input
              type="text"
              placeholder="Buscar por cargo, empresa ou palavra-chave..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              style={{
                width: '100%',
                paddingLeft: '3.5rem',
                paddingRight: '1.5rem',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                border: '2px solid var(--charcoal-300)',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: 'var(--charcoal-900)',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--navy-600)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--charcoal-300)'}
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="relative px-6 py-4 transition-all"
            style={{
              fontFamily: 'var(--font-sans)',
              border: activeFiltersCount > 0 
                ? '2px solid var(--navy-700)' 
                : '2px solid var(--charcoal-300)',
              background: activeFiltersCount > 0 
                ? 'var(--navy-700)' 
                : 'white',
              color: activeFiltersCount > 0 
                ? 'var(--cream-50)' 
                : 'var(--charcoal-700)',
              fontSize: '0.9375rem',
              fontWeight: 600
            }}
          >
            <Filter className="w-5 h-5" />
            {activeFiltersCount > 0 && (
              <span 
                className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--terracotta-500), var(--ochre-500))',
                  color: 'var(--charcoal-900)'
                }}
              >
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="px-6 py-4 flex items-center gap-2 transition-all"
              style={{
                fontFamily: 'var(--font-sans)',
                border: '2px solid var(--charcoal-300)',
                background: 'white',
                color: 'var(--charcoal-700)',
                fontSize: '0.9375rem',
                fontWeight: 600
              }}
            >
              <X className="w-4 h-4" />
              Limpar
            </button>
          )}
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="border-t pt-6 mt-6" style={{ borderTopColor: 'var(--charcoal-200)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label 
                  style={{ 
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--charcoal-700)',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.05em'
                  }}
                >
                  CATEGORIA
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid var(--charcoal-300)',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9375rem',
                    color: 'var(--charcoal-900)'
                  }}
                >
                  <option value="">Todas</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Educação">Educação</option>
                  <option value="Vendas">Vendas</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finanças">Finanças</option>
                  <option value="RH">RH</option>
                </select>
              </div>

              <div>
                <label 
                  style={{ 
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--charcoal-700)',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.05em'
                  }}
                >
                  TIPO
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid var(--charcoal-300)',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9375rem',
                    color: 'var(--charcoal-900)'
                  }}
                >
                  <option value="">Todos</option>
                  <option value="CLT">CLT</option>
                  <option value="PJ">PJ</option>
                  <option value="Estágio">Estágio</option>
                  <option value="Temporário">Temporário</option>
                </select>
              </div>

              <div>
                <label 
                  style={{ 
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--charcoal-700)',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.05em'
                  }}
                >
                  MODALIDADE
                </label>
                <select
                  value={filters.modality}
                  onChange={(e) => setFilters(prev => ({ ...prev, modality: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid var(--charcoal-300)',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9375rem',
                    color: 'var(--charcoal-900)'
                  }}
                >
                  <option value="">Todas</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Remoto">Remoto</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>

              <div>
                <label 
                  style={{ 
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--charcoal-700)',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.05em'
                  }}
                >
                  LOCALIZAÇÃO
                </label>
                <input
                  type="text"
                  placeholder="Cidade ou estado"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid var(--charcoal-300)',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9375rem',
                    color: 'var(--charcoal-900)'
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <h2 
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--charcoal-900)'
          }}
        >
          {loading ? 'Buscando vagas...' : `${jobs.length} vagas encontradas`}
        </h2>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="art-deco-border p-8 animate-pulse"
              style={{ 
                background: 'white',
                borderColor: 'var(--charcoal-300)'
              }}
            >
              <div className="h-6 rounded mb-3" style={{ background: 'var(--cream-300)' }}></div>
              <div className="h-4 rounded mb-2" style={{ background: 'var(--cream-300)' }}></div>
              <div className="h-4 rounded mb-4" style={{ background: 'var(--cream-300)' }}></div>
              <div className="h-20 rounded mb-4" style={{ background: 'var(--cream-300)' }}></div>
              <div className="h-10 rounded" style={{ background: 'var(--cream-300)' }}></div>
            </div>
          ))}
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div 
            style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--charcoal-600)',
              marginBottom: '1rem'
            }}
          >
            Nenhuma vaga encontrada
          </div>
          <div 
            style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--charcoal-500)',
              marginBottom: '2rem'
            }}
          >
            Tente ajustar seus filtros ou buscar por outros termos
          </div>
          <button
            onClick={clearFilters}
            className="art-deco-border px-8 py-3 font-semibold transition-all hover:scale-105"
            style={{
              fontFamily: 'var(--font-sans)',
              background: 'linear-gradient(135deg, var(--terracotta-500), var(--ochre-500))',
              color: 'var(--charcoal-900)',
              fontSize: '0.9375rem',
              letterSpacing: '0.05em'
            }}
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  const typeColors = {
    'CLT': { bg: 'var(--ochre-100)', text: 'var(--ochre-800)' },
    'PJ': { bg: 'var(--navy-100)', text: 'var(--navy-800)' },
    'Estágio': { bg: 'var(--terracotta-100)', text: 'var(--terracotta-800)' },
    'Temporário': { bg: 'var(--cream-300)', text: 'var(--charcoal-800)' }
  };

  const modalityColors = {
    'Presencial': { bg: 'var(--charcoal-100)', text: 'var(--charcoal-800)' },
    'Remoto': { bg: 'var(--terracotta-100)', text: 'var(--terracotta-800)' },
    'Híbrido': { bg: 'var(--navy-100)', text: 'var(--navy-800)' }
  };

  const daysUntilDeadline = job.deadline 
    ? Math.ceil((job.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 30;

  return (
    <div 
      className="art-deco-border p-8 cursor-pointer transition-all hover:scale-105 group"
      style={{ 
        background: 'white',
        borderColor: 'var(--charcoal-700)'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 
            style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: '1.375rem',
              fontWeight: 700,
              color: 'var(--charcoal-900)',
              marginBottom: '0.5rem',
              lineHeight: 1.3
            }}
          >
            {job.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--charcoal-600)', fontWeight: 600 }}>
            {job.company}
          </p>
        </div>
        <span 
          className="px-3 py-1.5 text-xs font-semibold"
          style={{
            fontFamily: 'var(--font-sans)',
            backgroundColor: typeColors[job.type].bg,
            color: typeColors[job.type].text,
            letterSpacing: '0.05em'
          }}
        >
          {job.type}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3" style={{ fontSize: '0.875rem', color: 'var(--charcoal-600)' }}>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span style={{ fontFamily: 'var(--font-sans)' }}>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            <span style={{ fontFamily: 'var(--font-sans)' }}>{job.salary || 'A combinar'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span 
            className="px-2.5 py-1 text-xs font-medium"
            style={{
              fontFamily: 'var(--font-sans)',
              backgroundColor: modalityColors[job.modality].bg,
              color: modalityColors[job.modality].text
            }}
          >
            {job.modality}
          </span>
          {daysUntilDeadline <= 7 && (
            <span 
              className="text-xs font-semibold px-2.5 py-1"
              style={{
                fontFamily: 'var(--font-sans)',
                backgroundColor: 'var(--terracotta-100)',
                color: 'var(--terracotta-800)'
              }}
            >
              {daysUntilDeadline} dias restantes
            </span>
          )}
        </div>
      </div>

      <p className="line-clamp-3 mb-6" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--charcoal-700)', lineHeight: 1.6 }}>
        {job.description}
      </p>

      <div className="flex items-center justify-between">
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--charcoal-500)' }}>
          <Clock className="w-3 h-3 inline mr-1" />
          Postado há {Math.ceil((Date.now() - job.postedAt.getTime()) / (1000 * 60 * 60 * 24))} dias
        </span>
        <button 
          className="px-6 py-2.5 font-semibold transition-all group-hover:scale-105"
          style={{
            fontFamily: 'var(--font-sans)',
            background: 'linear-gradient(135deg, var(--terracotta-500), var(--ochre-500))',
            color: 'var(--charcoal-900)',
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            border: '2px solid var(--charcoal-900)'
          }}
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}