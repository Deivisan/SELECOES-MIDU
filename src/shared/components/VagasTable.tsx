import React from 'react'
import type { Job } from '../types'

interface VagasTableProps {
  vagas: Job[]
  onEdit: (job: Job) => void
  onDelete: (id: string) => void
  onToggleActive: (id: string) => void
}

export default function VagasTable({ vagas, onEdit, onDelete, onToggleActive }: VagasTableProps) {
  const getStatusColor = (isActive: boolean) => isActive ? '#10b981' : '#6b7280'
  const getStatusLabel = (isActive: boolean) => isActive ? 'Ativa' : 'Inativa'

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ 
        width: '100%', 
        borderCollapse: 'separate', 
        borderSpacing: 0,
        fontSize: '0.875rem'
      }}>
        <thead>
          <tr style={{ background: 'var(--color-gray-50)', borderBottom: '2px solid var(--color-gray-200)' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--color-gray-700)' }}>Título</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--color-gray-700)' }}>Empresa</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--color-gray-700)' }}>Categoria</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--color-gray-700)' }}>Localização</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--color-gray-700)' }}>Salário</th>
            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 700, color: 'var(--color-gray-700)' }}>Status</th>
            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 700, color: 'var(--color-gray-700)' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vagas.map((vaga) => (
            <tr 
              key={vaga.id} 
              style={{ 
                borderBottom: '1px solid var(--color-gray-200)',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-gray-50)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <td style={{ padding: '1rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-gray-900)', marginBottom: '0.25rem' }}>
                  {vaga.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>
                  {vaga.type}
                </div>
              </td>
              <td style={{ padding: '1rem', color: 'var(--color-gray-700)' }}>{vaga.company}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {vaga.category}
                </span>
              </td>
              <td style={{ padding: '1rem', color: 'var(--color-gray-600)' }}>{vaga.location}</td>
              <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-gray-900)' }}>{vaga.salary}</td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>
                <button
                  onClick={() => onToggleActive(vaga.id)}
                  style={{
                    padding: '0.375rem 0.875rem',
                    borderRadius: 'var(--radius-full)',
                    background: vaga.isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                    color: getStatusColor(vaga.isActive),
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  {getStatusLabel(vaga.isActive)}
                </button>
              </td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => onEdit(vaga)}
                    title="Editar vaga"
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--color-primary)'
                      e.currentTarget.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--color-primary-light)'
                      e.currentTarget.style.color = 'var(--color-primary)'
                    }}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Tem certeza que deseja deletar a vaga "${vaga.title}"?`)) {
                        onDelete(vaga.id)
                      }
                    }}
                    title="Deletar vaga"
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#ef4444'
                      e.currentTarget.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'
                      e.currentTarget.style.color = '#ef4444'
                    }}
                  >
                    🗑️ Deletar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {vagas.length === 0 && (
        <div style={{ 
          padding: '3rem', 
          textAlign: 'center',
          color: 'var(--color-gray-500)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>Nenhuma vaga encontrada</div>
          <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Clique em "Nova Vaga" para criar a primeira vaga
          </div>
        </div>
      )}
    </div>
  )
}
