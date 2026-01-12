import React from 'react'

export default function PortalView() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800">Portal do Candidato</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-midu-blue">
            🚧 Em construção
          </h2>
          <p className="text-gray-600 text-center mb-8">
            O Portal do Candidato estará disponível em breve com:
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3">
              <span className="text-midu-green text-2xl">✓</span>
              <span>Cadastro e login de candidatos</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-midu-green text-2xl">✓</span>
              <span>Busca avançada de vagas</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-midu-green text-2xl">✓</span>
              <span>Upload de currículo (PDF)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-midu-green text-2xl">✓</span>
              <span>Acompanhamento de candidaturas</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-midu-green text-2xl">✓</span>
              <span>Notificações de status</span>
            </li>
          </ul>
          <div className="text-center">
            <a href="/public.html" className="btn-primary">
              ← Voltar para vagas
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
