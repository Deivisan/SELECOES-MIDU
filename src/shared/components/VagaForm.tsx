import React, { useState, useEffect } from 'react'
import type { Job } from '../types'

interface VagaFormProps {
  vaga?: Job
  onSave: (vaga: Partial<Job>) => void
  onCancel: () => void
}

export default function VagaForm({ vaga, onSave, onCancel }: VagaFormProps) {
  const [formData, setFormData] = useState({
    title: vaga?.title || '',
    company: vaga?.company || '',
    location: vaga?.location || '',
    type: vaga?.type || 'CLT' as const,
    modality: vaga?.modality || 'Presencial' as const,
    category: vaga?.category || 'Tecnologia',
    salary: vaga?.salary || '',
    description: vaga?.description || '',
    requirements: vaga?.requirements?.join('\n') || '',
    responsibilities: vaga?.responsibilities?.join('\n') || '',
    benefits: vaga?.benefits?.join('\n') || '',
    isActive: vaga?.isActive ?? true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const vagaData: Partial<Job> = {
      title: formData.title,
      company: formData.company,
      location: formData.location,
      type: formData.type as 'CLT' | 'PJ' | 'Estágio' | 'Temporário',
      modality: formData.modality as 'Presencial' | 'Remoto' | 'Híbrido',
      category: formData.category,
      salary: formData.salary,
      description: formData.description,
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      responsibilities: formData.responsibilities.split('\n').filter(r => r.trim()),
      benefits: formData.benefits.split('\n').filter(b => b.trim()),
      isActive: formData.isActive,
      postedAt: vaga?.postedAt || new Date()
    }

    onSave(vagaData)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    border: '2px solid var(--color-gray-200)',
    fontSize: '1rem',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease'
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 600,
    fontSize: '0.875rem',
    color: 'var(--color-gray-700)'
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '2rem',
      backdropFilter: 'blur(4px)'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '2rem',
        animation: 'fadeInUp 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-gray-900)' }}>
            {vaga ? '✏️ Editar Vaga' : '➕ Nova Vaga'}
          </h2>
          <button
            onClick={onCancel}
            style={{
              background: 'var(--color-gray-100)',
              border: 'none',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-gray-600)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-gray-200)'
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-gray-100)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Título */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>
                💼 Título da Vaga *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Desenvolvedor Full Stack Sênior"
                required
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-gray-200)'}
              />
            </div>

            {/* Empresa */}
            <div>
              <label style={labelStyle}>
                🏢 Empresa *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Ex: Ford Brasil"
                required
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-gray-200)'}
              />
            </div>

            {/* Localização */}
            <div>
              <label style={labelStyle}>
                📍 Localização *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ex: Salvador, BA"
                required
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-gray-200)'}
              />
            </div>

            {/* Tipo de Contrato */}
            <div>
              <label style={labelStyle}>
                📄 Tipo de Contrato *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                required
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-gray-200)'}
              >
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="Estágio">Estágio</option>
                <option value="Temporário">Temporário</option>
              </select>
            </div>

            {/* Modalidade */}
            <div>
              <label style={labelStyle}>
                🌍 Modalidade *
              </label>
              <select
                value={formData.modality}
                onChange={(e) => setFormData({ ...formData, modality: e.target.value as any })}
                required
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-gray-200)'}
              >
                <option value="Presencial">Presencial</option>
                <option value="Remoto">Remoto</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>

            {/* Categoria */}
            <div>
              <label style={labelStyle}>
                📂 Categoria *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-gray-200)'}
              >
                <option value="Tecnologia">Tecnologia</option>
                <option value="Administração">Administração</option>
                <option value="Vendas">Vendas</option>
                <option value="Marketing">Marketing</option>
                <option value="Saúde">Saúde</option>
                <option value="Engenharia">Engenharia</option>
                <option value="Educação">Educação</option>
                <option value="Finanças">Finanças</option>
              </select>
            </div>

            {/* Salário */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>
                💰 Salário *
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="Ex: R$ 8.000 - R$ 12.000"
                required
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-gray-200)'}
              />
            </div>

            {/* Descrição */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>
                📝 Descrição da Vaga *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva as responsabilidades e atividades principais..."
                required
                rows={4}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: '100px'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-gray-200)'}
              />
            </div>

            {/* Requisitos */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>
                ✅ Requisitos (um por linha)
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="Graduação em Ciência da Computação&#10;5+ anos de experiência com React&#10;Inglês avançado"
                rows={5}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: '120px'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-gray-200)'}
              />
            </div>

            {/* Responsabilidades */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>
                💼 Responsabilidades (um por linha)
              </label>
              <textarea
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                placeholder="Desenvolver aplicações web&#10;Revisar código de outros devs&#10;Participar de reuniões com cliente"
                rows={5}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: '120px'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-gray-200)'}
              />
            </div>

            {/* Benefícios */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>
                🎁 Benefícios (um por linha)
              </label>
              <textarea
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                placeholder="Plano de saúde&#10;Vale alimentação&#10;Home office flexível"
                rows={5}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: '120px'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-gray-200)'}
              />
            </div>

            {/* Status */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  style={{ marginRight: '0.75rem', width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-gray-700)' }}>
                  ✅ Vaga ativa (visível para candidatos)
                </span>
              </label>
            </div>
          </div>

          {/* Botões */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button
              type="button"
              onClick={onCancel}
              className="btn"
              style={{
                background: 'var(--color-gray-100)',
                color: 'var(--color-gray-700)',
                border: '1px solid var(--color-gray-300)'
              }}
            >
              ❌ Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-lg"
              style={{
                minWidth: '180px'
              }}
            >
              {vaga ? '💾 Salvar Alterações' : '➕ Criar Vaga'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
