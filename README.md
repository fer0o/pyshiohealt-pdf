# Pyshio Health PDF

Aplicación web en React para construir una bitácora de tratamiento de Physio Health y preparar una vista tipo hoja para impresión o exportación demo a PDF.

## Objetivo

El proyecto busca permitir que un usuario capture sesiones de tratamiento y genere una hoja final similar al PDF base `bitacoraa.pdf`.

Por ahora el foco está en la maqueta, el flujo de captura y la salida imprimible sobre hoja membretada física. La generación profesional de PDF por coordenadas todavía no está implementada.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS 4
- html2canvas
- jsPDF
- Vitest
- React Testing Library

## Cómo correrlo

```bash
npm install
npm run dev
```

El servidor normalmente abre en:

```txt
http://localhost:5173/
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run test
```

## Estado Actual

Ya existe una maqueta visual de la bitácora:

- Hoja tipo carta centrada con tamaño fijo `816 x 1056px`.
- Placeholder de logo con borde negro.
- Título `BITACORA DE TRATAMIENTO`.
- Sesiones en dos columnas.
- Firma simulada.
- Footer con tres líneas de color y datos de contacto.

La vista previa y la salida final están separadas por intención:

- En pantalla, la vista previa muestra la maquetación completa: logo, firma, líneas y footer.
- Al imprimir, se ocultan logo, firma y footer; solo salen el título y las sesiones.
- Al descargar PDF, también se ocultan logo, firma y footer.
- Los elementos solo visuales están marcados con `data-preview-only="true"`.
- El contenido imprimible/exportable está marcado con `data-printable-content="true"`.

La app ahora está separada en dos vistas:

- Home / wizard: captura inicial y flujo de llenado.
- Vista previa: hoja final con botones para editar, descargar o imprimir.
- Después de descargar o cerrar impresión, la app regresa al wizard con un aviso.

También hay un stepper visual:

- Paso 1: Sesiones
- Paso 2: Captura
- Paso 3: Vista previa

El wizard ya tiene editor de sesiones:

- Muestra la sesión actual.
- Permite capturar fecha.
- La fecha no puede ser anterior a `2000-01-01`.
- La fecha no puede ser posterior al día actual.
- Permite seleccionar hasta cinco tratamientos por sesión.
- Los tratamientos son dropdowns con opciones del PDF de referencia.
- No permite repetir el mismo tratamiento dentro de una sesión.
- Tiene navegación `Anterior` / `Siguiente`.
- La preview usa los datos editables del estado.
- El editor solo se activa después de confirmar el `Paso 1`.
- Cada sesión requiere fecha y al menos un tratamiento.
- `Siguiente` se bloquea si la sesión actual está incompleta.
- `Vista previa` se bloquea hasta que todas las sesiones estén completas.
- El botón `Vista previa` vive dentro del `Paso 3`.
- El Paso 2 muestra progreso de sesiones con chips.
- Cada chip indica si la sesión está completa o pendiente.
- Se puede saltar a una sesión dando click en su chip.

También existe un control en el wizard para elegir el número de sesiones:

- Solo acepta números.
- Mínimo: `1`.
- Máximo: `10`.
- Vive dentro del `Paso 1`.
- Por defecto muestra `1` sesión bloqueada.
- El botón `Editar` habilita el input.
- En modo edición aparecen `Confirmar` y `Cancelar`.
- El `Paso 2` se mantiene bloqueado hasta confirmar el `Paso 1`.
- La vista previa se mantiene deshabilitada hasta confirmar el `Paso 1`.
- Si son `10` sesiones, conserva la distribución del PDF base:
  - izquierda: `1, 2, 3, 4, 5`
  - derecha: `6, 7, 8, 9, 10`
- Para `10` sesiones, el layout usa una altura compacta para que las sesiones quepan dentro de la hoja carta fija sin traslaparse con firma/footer.
- Si son menos de `10`, distribuye impares a la izquierda y pares a la derecha:
  - ejemplo con `5`: izquierda `1, 3, 5`, derecha `2, 4`

## Tests

El proyecto tiene una base de pruebas con Vitest:

- `src/utils/sessionLayout.test.ts`: distribución de sesiones por columnas.
- `src/utils/sessionValidation.test.ts`: validación de fecha y tratamientos.
- `src/utils/createSessions.test.ts`: límites y creación de sesiones.
- `src/components/TreatmentLogPreview.test.tsx`: marcas de contenido visible solo en preview y contenido imprimible.

Para correrlas:

```bash
npm run test
```

## Archivos Importantes

- `src/App.tsx`: punto principal de la app.
- `src/pages/WizardPage.tsx`: vista home para capturar información.
- `src/pages/PreviewPage.tsx`: vista de hoja final.
- `src/components/WizardStepper.tsx`: progreso visual de pasos.
- `src/components/SessionProgress.tsx`: progreso y navegación entre sesiones.
- `src/components/SessionEditor.tsx`: captura de fecha y tratamientos por sesión.
- `src/components/TreatmentLogPreview.tsx`: hoja completa de preview.
- `src/components/TreatmentLogPreview.test.tsx`: pruebas del preview imprimible.
- `src/components/SessionCountControl.tsx`: control de número de sesiones.
- `src/components/SessionGrid.tsx`: layout de columnas.
- `src/components/SessionBlock.tsx`: una sesión individual.
- `src/data/exampleSessions.ts`: datos temporales de ejemplo.
- `src/data/treatmentOptions.ts`: opciones disponibles de tratamientos.
- `src/utils/createSessions.ts`: crea la lista visible de sesiones.
- `src/utils/dateRules.ts`: reglas de rango para fechas de sesión.
- `src/utils/sessionValidation.ts`: validaciones de sesiones completas.
- `src/utils/downloadPreviewPdf.ts`: descarga demo de PDF capturando la hoja HTML.
- `src/utils/sessionLayout.ts`: decide cómo repartir sesiones en columnas.
- `src/test/setup.ts`: setup de pruebas con React Testing Library.
- `MODELS.md`: contexto para otra IA o para retomar el proyecto.

## Próximo Paso

El siguiente paso planeado es validar la alineación fina contra la hoja membretada real:

1. Comparar impresión física sobre hoja membretada.
2. Ajustar márgenes/posiciones si el contenido no cae exactamente donde el cliente lo necesita.
3. Evaluar si la descarga demo por captura HTML es suficiente o si se migra a `pdf-lib` para un PDF profesional.

## Notas

El PDF base de referencia está fuera del repo local actual:

```txt
/Users/fernandomedellin/Downloads/bitacoraa.pdf
```

Ese PDF se usó solo como referencia visual para la maqueta.

La descarga actual de PDF es una implementación demo basada en capturar la hoja con `html2canvas` y generar el archivo con `jsPDF`. No captura stepper, botones ni fondo gris. Durante la captura oculta los elementos `data-preview-only`, por lo que el PDF queda limpio para hoja membretada: título y sesiones únicamente.
