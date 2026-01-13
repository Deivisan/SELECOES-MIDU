'use client';

import { useState } from 'react';
import { User, Mail, Phone, Globe, FileText, Briefcase, GraduationCap, Award, Calendar, CheckCircle } from 'lucide-react';

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState('vagas');
  const [user, setUser] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    linkedin: 'linkedin.com/in/joaosilva',
    bio: 'Desenvolvedor Full Stack com 5 anos de experiência',
    resumeUrl: '#'
  });

  const [appliedJobs] = useState([
    {
      id: '1',
      title: 'Desenvolvedor Frontend Senior',
      company: 'Tech Solutions Brasil',
      status: 'Em Análise',
      appliedAt: '2024-01-10',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'Digital Agency',
      status: 'Candidatura Enviada',
      appliedAt: '2024-01-08',
      statusColor: 'bg-blue-100 text-blue-800'
    }
  ]);

  const [savedJobs] = useState([
    {
      id: '3',
      title: 'Tech Lead',
      company: 'Startup X',
      salary: 'R$ 15.000 - R$ 20.000',
      location: 'São Paulo, SP'
    }
  ]);

  const stats = {
    applications: 12,
    interviews: 3,
    views: 45,
    profileCompletion: 85
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <h1 className="text-xl font-bold text-gray-900">Portal do Candidato</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Bem-vendo, <span className="font-semibold">{user.name}</span>
              </div>
              <button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.applications}</div>
                <div className="text-sm text-gray-600">Candidaturas</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.interviews}</div>
                <div className="text-sm text-gray-600">Entrevistas</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.views}</div>
                <div className="text-sm text-gray-600">Visualizações</div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.profileCompletion}%</div>
                <div className="text-sm text-gray-600">Perfil completo</div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'vagas', label: 'Minhas Candidaturas', icon: Briefcase },
              { id: 'salvos', label: 'Vagas Salvas', icon: Award },
              { id: 'perfil', label: 'Meu Perfil', icon: User }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'vagas' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Minhas Candidaturas</h2>
            
            {appliedJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appliedJobs.map(job => (
                  <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.statusColor}`}>
                        {job.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Aplicado em {new Date(job.appliedAt).toLocaleDateString('pt-BR')}
                      </span>
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="text-gray-500 mb-4">Você ainda não se candidatou a nenhuma vaga</div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Explorar Vagas
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'salvos' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Vagas Salvas</h2>
            
            {savedJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedJobs.map(job => (
                  <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>{job.location}</span>
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Candidatar-se
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="text-gray-500 mb-4">Você ainda não salvou nenhuma vaga</div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Explorar Vagas
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'perfil' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Meu Perfil</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={user.linkedin}
                    onChange={(e) => setUser(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Biografia</label>
                  <textarea
                    value={user.bio}
                    onChange={(e) => setUser(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currículo</label>
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Upload Currículo
                    </button>
                    <span className="text-sm text-gray-500">PDF, DOC ou DOCX (máx 5MB)</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-6">
                  <div className="text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 inline mr-1" />
                    Perfil {stats.profileCompletion}% completo
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}