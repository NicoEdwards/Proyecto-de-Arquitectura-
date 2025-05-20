//import { extraerPromociones } from './banchilescraping.ts';

//const data = await extraerPromociones('https://sitiospublicos.bancochile.cl/personas/beneficios/beneficios-del-dia');
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
    const contenedor = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3.lg\\:grid-cols-4.gap-4.px-0');
    if (!contenedor) return [];

    const items = contenedor.querySelectorAll('a');
    const resultados: { titulo: string; descripcion: string; dia: string; enlace: string }[] = [];

    items.forEach((item) => {
      const titulo = item.querySelector('.font-700.text-3.text-gray-dark.mb-2.overflow-ellipsis')?.textContent?.trim() || '';
      const descripcion = item.querySelector('.font-700.text-3.text-primary.mb-2.overflow-ellipsis')?.textContent?.trim() || '';
      const dia = document.querySelector('.capitalize')?.textContent?.trim().slice(0, -14) || 'Sin día específico';
      const href = item?.getAttribute('href') || '';
      const enlace = href.startsWith('http') ? href : `https://sitiospublicos.bancochile.cl/${href}`;


      if (titulo && descripcion) {
        resultados.push({ titulo, descripcion, dia, enlace });
      }
    });

    return resultados;
  });

  await browser.close();

  return agruparPorDia(promociones);
}

// Esta parte permite que también lo uses como script directo:
if (import.meta.main) {
  const resultado = await extraerPromociones('https://sitiospublicos.bancochile.cl/personas/beneficios/beneficios-del-dia');
  await Deno.writeTextFile('bancochile.json', JSON.stringify(resultado, null, 2));
  console.log('Archivo bancochile.json generado.');
}