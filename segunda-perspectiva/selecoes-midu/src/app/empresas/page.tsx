'use client';

import { useState } from 'react';
import { mockCompanies } from '@/data/mock';
import { Building2, Globe, MapPin, Users, Briefcase, Star, TrendingUp, Award } from 'lucide-react';

export default function EmpresasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = !selectedSector || company.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const sectors = ['Todas', 'Tecnologia', 'Saúde', 'Educação', 'Financeiro', 'Varejo'];

  const stats = {
    totalCompanies: mockCompanies.length,
    activeJobs: 156,
    newCompanies: 12,
    sectors: new Set(mockCompanies.map(c => c.sector)).size
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Empresas Parceiras</h1>
            <p className="text-xl text-blue-100 mb-8">
              Conheça as organizações que confiam na Seleções Midu
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex bg-white rounded-lg overflow-hidden">
                <Building2 className="w-5 h-5 text-gray-400 ml-4 my-auto" />
                <input
                  type="text"
                  placeholder="Buscar por empresa, setor ou palavra-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-4 text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalCompanies}</div>
              <div className="text-sm text-gray-600">Empresas Ativas</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.activeJobs}</div>
              <div className="text-sm text-gray-600">Vagas Abertas</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.newCompanies}</div>
              <div className="text-sm text-gray-600">Novas este Mês</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.sectors}</div>
              <div className="text-sm text-gray-600">Setores</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {sectors.map(sector => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector === 'Todas' ? '' : sector)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSector === sector || (sector === 'Todas' && !selectedSector)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCompanies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">Nenhuma empresa encontrada</div>
              <div className="text-gray-400">Tente ajustar sua busca ou filtros</div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Sua empresa está pronta para crescer?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Junte-se a nós e encontre os melhores talentos do mercado
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Começar Agora
            </button>
            <button className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Fale Conosco
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function CompanyCard({ company }: { company: any }) {
  const sizeColors = {
    'Pequena': 'bg-green-100 text-green-800',
    'Média': 'bg-blue-100 text-blue-800',
    'Grande': 'bg-purple-100 text-purple-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
          <Building2 className="w-8 h-8 text-gray-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${sizeColors[company.size]}`}>
              {company.size}
            </span>
            <span className="text-sm text-gray-500">{company.sector}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{company.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{company.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Globe className="w-4 h-4" />
          <span className="text-blue-600 hover:underline">{company.website}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>+100 vagas preenchidas</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <Star className="w-4 h-4 text-gray-300" />
        </div>
        <span className="text-sm text-gray-600">4.0 (24 avaliações)</span>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          Ver Vagas
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
          + Info
        </button>
      </div>
    </div>
  );
}