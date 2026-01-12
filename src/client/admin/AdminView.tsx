import React, { useState } from 'react'
import { mockJobs, mockAdmin } from '@shared/data/mockData'

export default function AdminView() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login - aceita qualquer combinação para demo
    if (email && password) {
      setIsLoggedIn(true)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-midu-blue to-midu-green flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-midu-blue to-midu-green rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              M
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
            <p className="text-gray-600 mt-2">Midu Group - RH</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-midu-blue"
                placeholder="daniel@midugroup.com.br"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-midu-blue"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Demo: use qualquer e-mail e senha
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-midu-blue to-midu-green rounded-lg flex items-center justify-center text-white font-bold">
              M
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Painel RH</h1>
              <p className="text-sm text-gray-600">Bem-vindo, {mockAdmin.name}</p>
            </div>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Dashboard */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">📋</div>
            <div className="text-2xl font-bold text-midu-blue">{mockJobs.length}</div>
            <div className="text-gray-600">Vagas Ativas</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-midu-green">47</div>
            <div className="text-gray-600">Candidatos</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-midu-orange">128</div>
            <div className="text-gray-600">Candidaturas</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-gray-600">Aprovados</div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Vagas Publicadas</h2>
            <button className="btn-primary">+ Nova Vaga</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empresa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Local</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidatos</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockJobs.slice(0, 5).map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                      {job.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {job.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {job.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {Math.floor(Math.random() * 20) + 5} candidatos
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Ativa
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-midu-blue hover:text-blue-700 mr-3">Editar</button>
                      <button className="text-gray-600 hover:text-gray-800">Ver</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
