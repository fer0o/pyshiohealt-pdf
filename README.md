# Pyshio Health PDF

Aplicación web en React para construir una bitácora de tratamiento de Physio Health y preparar una vista tipo hoja para impresión o futura exportación a PDF.

## Objetivo

El proyecto busca permitir que un usuario capture sesiones de tratamiento y genere una hoja final similar al PDF base `bitacoraa.pdf`.

Por ahora el foco está en la maqueta y la lógica base. La generación final de PDF todavía no está implementada.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS 4

## Cómo correrlo

```bash
npm install
npm run dev
```

El servidor normalmente abre en:

```txt
http://localhost:5173/
```

## Estado Actual

Ya existe una maqueta visual de la bitácora:

- Hoja tipo carta centrada.
- Placeholder de logo con borde negro.
- Título `BITACORA DE TRATAMIENTO`.
- Sesiones en dos columnas.
- Firma simulada.
- Footer con tres líneas de color y datos de contacto.

La app ahora está separada en dos vistas:

- Home / wizard: captura inicial y flujo de llenado.
- Vista previa: hoja final con botones para editar, descargar o imprimir.

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
- Si son menos de `10`, distribuye impares a la izquierda y pares a la derecha:
  - ejemplo con `5`: izquierda `1, 3, 5`, derecha `2, 4`

## Archivos Importantes

- `src/App.tsx`: punto principal de la app.
- `src/pages/WizardPage.tsx`: vista home para capturar información.
- `src/pages/PreviewPage.tsx`: vista de hoja final.
- `src/components/WizardStepper.tsx`: progreso visual de pasos.
- `src/components/SessionProgress.tsx`: progreso y navegación entre sesiones.
- `src/components/SessionEditor.tsx`: captura de fecha y tratamientos por sesión.
- `src/components/TreatmentLogPreview.tsx`: hoja completa de preview.
- `src/components/SessionCountControl.tsx`: control de número de sesiones.
- `src/components/SessionGrid.tsx`: layout de columnas.
- `src/components/SessionBlock.tsx`: una sesión individual.
- `src/data/exampleSessions.ts`: datos temporales de ejemplo.
- `src/data/treatmentOptions.ts`: opciones disponibles de tratamientos.
- `src/utils/createSessions.ts`: crea la lista visible de sesiones.
- `src/utils/dateRules.ts`: reglas de rango para fechas de sesión.
- `src/utils/sessionValidation.ts`: validaciones de sesiones completas.
- `src/utils/sessionLayout.ts`: decide cómo repartir sesiones en columnas.
- `MODELS.md`: contexto para otra IA o para retomar el proyecto.

## Próximo Paso

El siguiente paso planeado es refinar el wizard de captura:

1. Confirmar cuándo una sesión está lista.
2. Pulir la vista previa para impresión.
3. Implementar descarga de PDF en una fase posterior.

## Notas

El PDF base de referencia está fuera del repo local actual:

```txt
/Users/fernandomedellin/Downloads/bitacoraa.pdf
```

Ese PDF se usó solo como referencia visual para la maqueta.
