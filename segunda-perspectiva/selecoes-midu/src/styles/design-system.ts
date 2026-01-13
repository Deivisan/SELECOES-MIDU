/**
 * EDITORIAL/ART DECO DESIGN SYSTEM
 * Paleta: Terra/Dourado com acentos profundos
 * Tipografia: Serif editorial + Sans-serif moderna
 * Geometria: Elementos Art Deco, bordas angulares
 */

export const colors = {
  // Terra & Dourado
  terracotta: {
    50: '#FDF5F3',
    100: '#FAE8E3',
    200: '#F5CFC4',
    300: '#EDB09E',
    400: '#E38B76',
    500: '#D46B56', // Primary terracotta
    600: '#B54E3A',
    700: '#8E3D2E',
    800: '#6B2E22',
    900: '#4A201A',
  },
  ochre: {
    50: '#FEFBF3',
    100: '#FDF6E3',
    200: '#FAE8C1',
    300: '#F5D89A',
    400: '#EEC56F',
    500: '#E5B045', // Primary ochre/gold
    600: '#C89327',
    700: '#9E7318',
    800: '#75540F',
    900: '#4F3908',
  },
  navy: {
    50: '#F4F6F9',
    100: '#E8ECF2',
    200: '#D0D8E6',
    300: '#A9B8D0',
    400: '#7B8FB5',
    500: '#4F6899',
    600: '#2C4975', // Deep navy
    700: '#1F3556',
    800: '#15243D',
    900: '#0D1726',
  },
  cream: {
    50: '#FFFEFB',
    100: '#FEFCF5',
    200: '#FDF9EB',
    300: '#FBF4DC',
    400: '#F8EDCA',
    500: '#F5E6B8', // Warm cream
    600: '#E8D49A',
    700: '#D4BC7A',
    800: '#B8A05C',
    900: '#8F7B42',
  },
  charcoal: {
    50: '#F7F7F8',
    100: '#EFEFF0',
    200: '#DCDCDE',
    300: '#BFBFC2',
    400: '#9A9A9E',
    500: '#72727A',
    600: '#4A4A52',
    700: '#2E2E33', // Deep charcoal
    800: '#1C1C1F',
    900: '#0F0F11',
  },
};

export const typography = {
  // Editorial Serif: Para headings, números decorativos, citações
  serif: {
    family: '"Crimson Text", "Playfair Display", Georgia, serif',
    weights: {
      normal: 400,
      semibold: 600,
      bold: 700,
    },
  },
  // Modern Sans: Para corpo de texto, labels
  sans: {
    family: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  // Monospace: Para códigos, dados técnicos
  mono: {
    family: '"JetBrains Mono", "Fira Code", monospace',
    weights: {
      normal: 400,
      medium: 500,
    },
  },
};

export const decorativeElements = {
  // Bordas geométricas Art Deco
  artDecoBorder: `
    position: relative;
    &::before, &::after {
      content: '';
      position: absolute;
      background: linear-gradient(135deg, var(--ochre-500) 0%, var(--terracotta-500) 100%);
    }
  `,
  
  // Números decorativos gigantes
  decorativeNumber: {
    fontSize: 'clamp(8rem, 20vw, 16rem)',
    fontFamily: typography.serif.family,
    fontWeight: 700,
    lineHeight: 0.85,
    color: colors.cream[200],
    opacity: 0.15,
    position: 'absolute' as const,
    userSelect: 'none' as const,
    pointerEvents: 'none' as const,
  },
  
  // Textura de papel
  paperTexture: `
    background-image: 
      repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.03) 0px,
        transparent 1px,
        transparent 2px,
        rgba(0, 0, 0, 0.03) 3px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.03) 0px,
        transparent 1px,
        transparent 2px,
        rgba(0, 0, 0, 0.03) 3px
      );
  `,
};

export const animations = {
  // Scroll reveal escalonado
  scrollReveal: `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  
  // Fade in elegante
  fadeIn: `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
  
  // Parallax suave
  parallax: `
    will-change: transform;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  `,
};

export const layout = {
  // Grid assimétrico
  asymmetricGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '2rem',
    alignItems: 'start',
  },
  
  // Seções com sobreposição
  overlappingSection: {
    position: 'relative' as const,
    zIndex: 10,
    marginTop: '-4rem',
  },
  
  // Diagonal flow
  diagonalFlow: `
    clip-path: polygon(0 5%, 100% 0, 100% 95%, 0 100%);
  `,
};

// Componentes reutilizáveis
export const components = {
  card: {
    editorial: `
      background: white;
      border: 2px solid ${colors.charcoal[200]};
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border: 1px solid ${colors.ochre[300]};
        pointer-events: none;
      }
    `,
  },
  
  button: {
    primary: {
      background: `linear-gradient(135deg, ${colors.terracotta[500]} 0%, ${colors.ochre[500]} 100%)`,
      color: colors.charcoal[900],
      fontFamily: typography.sans.family,
      fontWeight: typography.sans.weights.semibold,
      padding: '0.875rem 2rem',
      border: `2px solid ${colors.charcoal[900]}`,
      position: 'relative' as const,
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    
    secondary: {
      background: 'transparent',
      color: colors.navy[700],
      fontFamily: typography.sans.family,
      fontWeight: typography.sans.weights.medium,
      padding: '0.875rem 2rem',
      border: `2px solid ${colors.navy[700]}`,
      position: 'relative' as const,
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};

export default {
  colors,
  typography,
  decorativeElements,
  animations,
  layout,
  components,
};
