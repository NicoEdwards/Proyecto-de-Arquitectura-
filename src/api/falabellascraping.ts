//import { extraerPromociones } from './falabellascraping.ts';

//const data = await extraerPromociones('https://www.bancofalabella.cl/descuentos');
//console.log(data);
import { launch } from 'https://deno.land/x/astral/mod.ts';

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

function detectarDia(texto: string): string {
  const diaEncontrado = dias.find(dia => texto.toLowerCase().includes(dia.toLowerCase()));
  return diaEncontrado || 'Sin día específico';
}

function agruparPorDia(promos: { titulo: string; descripcion: string; dia: string; enlace: string }[]) {
  const agrupado: Record<string, { titulo: string; descripcion: string; enlace: string }[]> = {};

  for (const { titulo, descripcion, dia, enlace } of promos) {
    if (!agrupado[dia]) agrupado[dia] = [];
    agrupado[dia].push({ titulo, descripcion, enlace });
  }

  return agrupado;
}

export async function extraerPromociones(url: string) {
  const browser = await launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForTimeout(5000); // Espera que cargue el contenido

  const promociones: { titulo: string; descripcion: string; dia: string; enlace: string }[] = await page.evaluate(() => {
    const contenedor = document.querySelector('.benefits-list');
    if (!contenedor) return [];

    const items = contenedor.querySelectorAll('app-benefit');
    const resultados: { titulo: string; descripcion: string; dia: string; enlace: string }[] = [];

    items.forEach((item) => {
      const titulo = item.querySelector('h5')?.textContent?.trim() || '';
      const descripcion = item.querySelector('.benefit-body__text')?.textContent?.trim() || '';
      const dia = item.querySelector('.benefit-footer span')?.textContent?.trim() || 'Sin día específico';
      const href = item.firstElementChild?.getAttribute('href') || '';
      const enlace = href.startsWith('http') ? href : `https://www.bancofalabella.cl/${href}`;

      if (titulo && descripcion) {
        resultados.push({ titulo, descripcion, dia, enlace });
      }
    });

    return resultados;
  });

  await browser.close();

  return agruparPorDia(promociones);
}

// Permite ejecutar como script
if (import.meta.main) {
  const resultado = await extraerPromociones('https://www.bancofalabella.cl/descuentos');
  await Deno.writeTextFile('falabella.json', JSON.stringify(resultado, null, 2));
  console.log('Archivo falabella.json generado.');
}