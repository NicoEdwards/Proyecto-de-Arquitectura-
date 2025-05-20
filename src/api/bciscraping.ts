import { launch } from 'https://deno.land/x/astral/mod.ts';

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

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
  await page.waitForTimeout(3000);

  const promociones: { titulo: string; descripcion: string; dia: string; enlace: string }[] = [];
  var n = 0;
  //continuamos mientras n < 30
  while (n < 30) {
    n++;
    // Extraer los datos de la página actual
    const nuevos = await page.evaluate(() => {
      const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

      const contenedor = document.querySelector('.w-100.px-3.px-lg-0.pl-lg-4.d-flex.flex-wrap.align-items-stretch');
      if (!contenedor) return [];

      const items = contenedor.querySelectorAll('a');
      const resultados: { titulo: string; descripcion: string; dia: string; enlace: string }[] = [];

      items.forEach((item) => {
        const titulo = item.querySelector('.card__title.color-gray-dark.font-weight-bold.mb-3.text-truncate-2')?.textContent?.trim() || '';

        let descripcion = '';
        const pre_descripcion = item.querySelector('.d-flex.align-items-center.mb-2');
        if (pre_descripcion) {
          descripcion = pre_descripcion.querySelector('p')?.textContent?.trim() || '';
        } else {
          descripcion = item.querySelector('.card__bajada')?.textContent?.trim() || '';
        }

        const bajadas = item.querySelectorAll('.card__bajada');
        const pre_dia = bajadas.length > 0 ? bajadas[bajadas.length - 1].textContent.trim() : '';
        const texto = pre_dia.toLowerCase();
        const dias_detectados = dias.filter(dia => texto.includes(dia.toLowerCase()));
        const dia = dias_detectados.length > 0 ? dias_detectados.join(', ') : dias.join(', ');

        const href = item?.getAttribute('href') || '';
        const enlace = href.startsWith('http') ? href : `https://www.bci.cl/${href}`;

        if (titulo && descripcion) {
          resultados.push({ titulo, descripcion, dia, enlace });
        }
      });

      return resultados;
    });

    promociones.push(...nuevos);

    // Intentar hacer clic en el botón de siguiente página
    const siguiente = await page.$('.paginator__button.paginator__button--right.p-2.m-2.d-flex.align-items-center.justify-content-center');

    if (siguiente) {
      //vamos a mostrar en consola 'pagina n'
      console.log(`Pagina ${n} completada`);

      await siguiente.click();
      await page.waitForTimeout(3000); // tiempo para cargar nueva página
    } else {
      break; // salir del while si no hay botón de siguiente
    }
  }

  await browser.close();
  return agruparPorDia(promociones);
}

// Para ejecutar directamente
if (import.meta.main) {
  const resultado = await extraerPromociones('https://www.bci.cl/beneficios/beneficios-bci');
  await Deno.writeTextFile('bci.json', JSON.stringify(resultado, null, 2));
  console.log('Archivo bci.json generado.');
}
