import { launch } from 'https://deno.land/x/astral/mod.ts';

interface Promocion {
  titulo: string;
  descripcion: string;
  dia: string;
}

async function extraerPromociones(url: string): Promise<Promocion[]> {
  const browser = await launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForTimeout(5000);

  const data = await page.evaluate(() => {
    const contenedor = document.querySelector('div.benefits-list');
    if (!contenedor) return [];

    const promos: { titulo: string; descripcion: string; dia: string }[] = [];

    const beneficios = contenedor.querySelectorAll('app-benefit');

    beneficios.forEach(benefit => {
      const titulo = benefit.querySelector('app-benefit-body h5')?.textContent?.trim() ?? '';
      const descripcion = benefit.querySelector('app-benefit-body .benefit-body__text')?.textContent?.trim() ?? '';
      const dia = benefit.querySelector('app-benefit-footer span')?.textContent?.trim() ?? 'Sin día específico';

      if (titulo.includes('%')) {
        promos.push({ titulo, descripcion, dia });
      }
    });

    return promos;
  });

  await browser.close();
  return data;
}

if (import.meta.main) {
  const promociones = await extraerPromociones('https://www.bancofalabella.cl/descuentos');
  await Deno.writeTextFile('falabella.json', JSON.stringify(promociones, null, 2));
  console.log('✅ Archivo "falabella.json" generado con éxito');
}
