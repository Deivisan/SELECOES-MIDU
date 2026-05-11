# Design System — Midu Group

> Paleta de cores, tipografia, spacing e tokens do projeto. Atualizado com a cor da logo (roxo #281446) como acento de marca.

## Palette

```css
:root {
  /* Cores primárias — cor da logo #281446 (roxo) */
  --primary:       #281446;      /* Brand principal */
  --primary-dark:  #1c0f2e;      /* Hover (20% escuro) */
  --primary-light: #432a6b;      /* Estado sutil (20% claro) */

  /* Cores secundárias */
  --secondary:       #0d9488;   /* Verde teal — ações alternativas */
  --secondary-dark:  #0f766e;

  /* Acento complementar — laranja para contraste com roxo */
  --accent:       #f59e0b;       /* Laranja — detalhes, badges */
  --accent-dark:  #d97706;
  --accent-light: #fbbf24;

  /* Semânticas */
  --success: #10b981;
  --error:   #ef4444;
  --warning: #f59e0b;  /* Alinhado ao accent */

  /* Fundos */
  --bg:           #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary:  #f1f5f9;

  /* Texto */
  --text:          #1e293b;
  --text-muted:    #64748b;
  --text-light:    #94a3b8;

  /* Bordas */
  --border:        #e2e8f0;
  --border-dark:   #cbd5e1;
}
```

## Typography

- **Família principal**: Inter (Google Fonts)
- **Pesos**: 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold)
- **Tamanhos base**: 12px, 14px, 16px, 18px, 20px, 24px, 32px, 48px, 72px
- **Line-height**: body 1.5; headings 1.2

## Spacing

Base 8px. Tokens:
- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 16px
- `--spacing-lg`: 24px
- `--spacing-xl`: 32px
- `--spacing-2xl`: 48px
- `--spacing-3xl`: 64px

## Border Radius

- `--radius-sm`: 4px
- `--radius`: 6px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-xl`: 16px
- `--radius-full`: 9999px

## Shadows

Sombras sutis em níveis sm → xl (ver `styles.css`).

## Componentes

### Botões

- **Primary**: background `var(--primary)`, text `white`, radius `var(--radius-full)`
- **Secondary**: background `transparent`, border `1px solid var(--border)`, text `var(--text)`
- **Accent**: background `var(--accent)`, text `white`, radius `var(--radius-full)`

### Cards

Background `var(--bg-secondary)` ou `var(--surface)`, border `1px solid var(--border)`, radius `var(--radius-md)`.

### Inputs

Border `1px solid var(--border)`, radius `var(--radius)`, focus ring `var(--primary)`.

---

> Última atualização: cores sincronizadas com logo extraída (#281446).
