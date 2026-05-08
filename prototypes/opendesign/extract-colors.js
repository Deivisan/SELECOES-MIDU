const fs = require('fs');
const path = require('path');

// Tenta usar Jimp (se instalado) ou Canvas
async function extractDominantColor(imagePath) {
  try {
    // Tenta Jimp primeiro
    const Jimp = require('jimp');
    const image = await Jimp.read(imagePath);
    const resized = image.resize(100, 100); // Reduz para análise mais rápida
    const pixels = resized.getBuffer(resized.bitmap);

    // Análise simples: encontrar o pixel mais frequente
    const colorCount = {};
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      // Ignora pixels transparentes
      if (a < 128) continue;

      const key = `${r},${g},${b}`;
      colorCount[key] = (colorCount[key] || 0) + 1;
    }

    // Encontra a cor mais frequente
    let dominantKey = Object.keys(colorCount).reduce((a, b) =>
      colorCount[a] > colorCount[b] ? a : b
    );

    const [r, g, blueVal] = dominantKey.split(',').map(Number);
    return { r, g, blue: blueVal };
  } catch (err1) {
    try {
      // Fallback: tenta com node-canvas
      const { createCanvas, loadImage } = require('canvas');
      const canvas = createCanvas(100, 100);
      const ctx = canvas.getContext('2d');
      const image = await loadImage(imagePath);
      ctx.drawImage(image, 0, 0, 100, 100);
      const imageData = ctx.getImageData(0, 0, 100, 100);
      const data = imageData.data;

      const colorCount = {};
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 128) continue;

        const key = `${r},${g},${b}`;
        colorCount[key] = (colorCount[key] || 0) + 1;
      }

      let dominantKey = Object.keys(colorCount).reduce((a, b) =>
        colorCount[a] > colorCount[b] ? a : b
      );

      const [r, g, blueVal] = dominantKey.split(',').map(Number);
      return { r, g, blue: blueVal };
    } catch (err2) {
      console.error('Erro ao extrair cor:', err2.message);
      // Fallback: cor padrão azul corporativa
      console.log('Usando cor padrão #2563eb (azul)');
      return { r: 37, g: 99, blue: 235 }; // azul #2563eb
    }
  }
}

  // Converte RGB para OKLch (simplificado - aproximação para CSS)
function rgbToApproxOKLch(r, g, blue) {
  // Conversão RGB -> Linear RGB
  const toLinear = (c) => {
    c = c / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const R = toLinear(r);
  const G = toLinear(g);
  const B = toLinear(blue);

  // Linear RGB -> OKLab (aproximação)
  const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
  const m = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
  const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a_oklab = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const beta = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  // OKLab -> OKLch
  const C = Math.sqrt(a_oklab * a_oklab + beta * beta);
  let h = Math.atan2(beta, a_oklab) * (180 / Math.PI);
  if (h < 0) h += 360;

  // OKLab L está em [0, 1], converter para OKLch L% (0-100%)
  const Lpct = L * 100;

  return { L: Lpct, C, h };
}

// Gera cor OKLch formatada para CSS
function generateOKLchCSS(l, c, h) {
  return `oklch(${l.toFixed(1)}% ${c.toFixed(2)} ${h.toFixed(0)})`;
}

async function main() {
  const logoPath = path.join(__dirname, 'assets', 'logo.png');

  if (!fs.existsSync(logoPath)) {
    console.error('Logo não encontrada em:', logoPath);
    process.exit(1);
  }

  console.log('Analisando logo:', logoPath);
  const { r, g, blue } = await extractDominantColor(logoPath);
  console.log(`Cor dominante RGB: rgb(${r}, ${g}, ${blue})`);

  const oklch = rgbToApproxOKLch(r, g, blue);
  console.log(`OKLch: L=${oklch.L.toFixed(1)}% C=${oklch.C.toFixed(2)} h=${oklch.h.toFixed(0)}`);

  const oklchCSS = generateOKLchCSS(oklch.L, oklch.C, oklch.h);
  console.log(`Cor CSS: ${oklchCSS}`);

  // Gera cores derivadas para o design system
  const primary = oklchCSS;
  const primaryDark = generateOKLchCSS(
    Math.max(0, oklch.L - 10),
    Math.min(oklch.C * 1.1, 0.3),
    oklch.h
  );
  const primaryLight = generateOKLchCSS(
    Math.min(100, oklch.L + 10),
    oklch.C * 0.8,
    oklch.h
  );

  console.log('\nCores derivadas:');
  console.log(`  --primary: ${primary}`);
  console.log(`  --primary-dark: ${primaryDark}`);
  console.log(`  --primary-light: ${primaryLight}`);

  // Salva em arquivo para uso posterior
  const brandSpec = {
    primary: { r, g, blue, oklch },
    palette: {
      '--primary': primary,
      '--primary-dark': primaryDark,
      '--primary-light': primaryLight
    }
  };

  fs.writeFileSync(
    path.join(__dirname, 'brand-colors.json'),
    JSON.stringify(brandSpec, null, 2)
  );
  console.log('\n✔ Cores salvas em brand-colors.json');
}

main().catch(console.error);
