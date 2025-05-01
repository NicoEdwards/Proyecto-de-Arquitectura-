import { launch } from 'https://deno.land/x/astral/mod.ts';

const browser = await launch();
const page = await browser.newPage();

await page.goto('https://www.bancofalabella.cl/descuentos');
await page.waitForTimeout(5000); // Espera que cargue el contenido

// Extrae textos con % desde el DOM
const texts = await page.evaluate(() => {
  const elements = Array.from(document.querySelectorAll('body *'));
  return elements
    .map(el => el.textContent?.trim())
    .filter(text => text && text.includes('%') && text.length < 200);
});

// Días de la semana disponibles
const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

function detectarDia(texto: string): string {
  const diaEncontrado = dias.find(dia => texto.toLowerCase().includes(dia.toLowerCase()));
  return diaEncontrado || 'Sin día específico';
}

// Normaliza y agrupa promociones por día
function agruparPorDia(promos: string[]): Record<string, string[]> {
  const agrupado: Record<string, Map<string, string>> = {};

  for (const promo of promos) {
    const dia = detectarDia(promo);
    const base = promo
      .replace(/Exclusivo.*$/i, '')
      .replace(/sin tope.*$/i, '')
      .replace(/\(.*?\)/g, '')
      .replace(/[\n\r]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!agrupado[dia]) agrupado[dia] = new Map();
    if (!agrupado[dia].has(base) || promo.length < agrupado[dia].get(base)!.length) {
      agrupado[dia].set(base, promo);
    }
  }

  // Convierte los Map a arrays simples
  const resultado: Record<string, string[]> = {};
  for (const [dia, mapa] of Object.entries(agrupado)) {
    resultado[dia] = Array.from(mapa.values());
  }

  return resultado;
}

export async function fetchHTML(url: string): Promise<Record<string, string[]>> {
  const browser = await launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForTimeout(5000); // Espera que cargue el contenido.

  const texts = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('body *'));
    return elements
      .map(el => el.textContent?.trim())
      .filter(text => text && text.includes('%') && text.length < 200);
  });

  await browser.close();
  return agruparPorDia(texts);
}
