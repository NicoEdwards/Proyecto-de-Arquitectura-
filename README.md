## Project Description

Web app con Deno para mantener a los usuarios informados sobre la información pública de los bancos; descuentos, convenios e inversiones. No se ingresan datos bancarios, simplemente se elige el tipo de cuenta que el usuario posee (ej: cuenta corriente en banco X) y se muestra un feed que funciona de forma similar al de rr.ss. (ej: Twitter o Instagram) con esta información.

## To-Do

1. Avance 1

- [x] Login básico, cerrar sesión, manejo de tokens de sesión, llamada a la base de datos para validar contraseña. No obligatorio formulario de registro de usuarios.
- [x] Front-end responsive, Smartphone, Tablet y Desktop.
- [x] Ventanas de carga y toast donde corresponda.
- [x] Conexión con base de datos a través de API, al menos una funcionalidad debe realizar preguntas a la base de datos (independiente del login).

2. Avance 2

- [x] Componentes que muestran la información obtenida de las páginas de los bancos en el feed de los usuarios logeados.
- [x] Estructura del feed.
- [x] Filtro de preferencias.
- [ ] Notificaciones emergentes de interacción con la página.
- [ ] Al menos una funcionalidad presenta pruebas unitarias con un coverage superior al 80% para dicha funcionalidad.
- [x] Solución operativa en ambiente Cloud (no únicamente local en un computador).

3. Buenas prácticas

- [x] El código disponible en el repositorio cumple con los estándares de código. Está todo el código en inglés y se utilizan nombres de variables y funciones que representen correctamente lo que son:

      - Incluye base de datos (nombres de tablas y atributos deberán estar en inglés).
      - Los nombres de los archivos y carpetas del código también deben estar en inglés.

- [x] Cada función está debidamente comentada en el código (Los comentarios pueden estar en español).
- [x] La documentación general se encuentra al día (Puede estar en español).
- [x] El branching model es apropiado al desarrollo.
- [x] Mínimo una rama Master y una por cada épica/funcionalidad.
- [x] Cada commit está asociado a una tarea en Jira.
- [x] Se realiza al menos un commit por semana, por cada miembro del equipo
- [ ] Bonus: El código completo tiene más del 50% de coverage de pruebas unitarias.
