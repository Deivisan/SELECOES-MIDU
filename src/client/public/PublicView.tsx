import React, { useState } from 'react'
import { mockJobs, categories } from '@shared/data/mockData'
import type { Job } from '@shared/types'

export default function PublicView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [selectedModality, setSelectedModality] = useState<string>('Todas')

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'Todas' || job.category === selectedCategory
    const matchesModality = selectedModality === 'Todas' || job.modality === selectedModality

    return matchesSearch && matchesCategory && matchesModality && job.isActive
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-midu-blue to-midu-green rounded-lg flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Midu Group</h1>
              <p className="text-sm text-gray-600">Sua próxima oportunidade começa aqui</p>
            </div>
          </div>
          <a href="/portal.html" className="btn-primary">
            Portal do Candidato
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-midu-blue to-midu-green text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Encontre seu próximo desafio profissional
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Conectamos talentos da Bahia com as melhores oportunidades
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-4 flex gap-3">
            <input
              type="text"
              placeholder="Buscar por cargo, empresa ou localização..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-midu-blue"
            />
            <button className="btn-accent px-8">
              🔍 Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-midu-blue"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedModality}
            onChange={(e) => setSelectedModality(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-midu-blue"
          >
            <option value="Todas">Todas as modalidades</option>
            <option value="Remoto">Remoto</option>
            <option value="Presencial">Presencial</option>
            <option value="Híbrido">Híbrido</option>
          </select>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Nenhuma vaga encontrada com esses filtros.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('Todas')
                setSelectedModality('Todas')
              }}
              className="mt-4 btn-secondary"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2026 Midu Group - Miranda + Duarte | Desenvolvido com 💙 na Bahia
          </p>
        </div>
      </footer>
    </div>
  )
}

function JobCard({ job }: { job: Job }) {
  return (
    <div className="job-card">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
        <span className="bg-midu-green text-white text-xs px-2 py-1 rounded">
          {job.type}
        </span>
      </div>

      <p className="text-gray-600 font-medium mb-2">{job.company}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-sm text-gray-500 flex items-center gap-1">
          📍 {job.location}
        </span>
        <span className="text-sm text-gray-500 flex items-center gap-1">
          💼 {job.modality}
        </span>
      </div>

      {job.salary && (
        <p className="text-midu-blue font-semibold mb-3">{job.salary}</p>
      )}

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>

      <div className="flex gap-2">
        <a href={`/portal.html?job=${job.id}`} className="flex-1 btn-primary text-center">
          Ver detalhes
        </a>
      </div>
    </div>
  )
}
