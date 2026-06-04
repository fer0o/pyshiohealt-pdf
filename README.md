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

También existe un control para elegir el número de sesiones:

- Solo acepta números.
- Mínimo: `0`.
- Máximo: `10`.
- Si son `10` sesiones, conserva la distribución del PDF base:
  - izquierda: `1, 2, 3, 4, 5`
  - derecha: `6, 7, 8, 9, 10`
- Si son menos de `10`, distribuye impares a la izquierda y pares a la derecha:
  - ejemplo con `5`: izquierda `1, 3, 5`, derecha `2, 4`

## Archivos Importantes

- `src/App.tsx`: punto principal de la app.
- `src/components/TreatmentLogPreview.tsx`: hoja completa de preview.
- `src/components/SessionCountControl.tsx`: control de número de sesiones.
- `src/components/SessionGrid.tsx`: layout de columnas.
- `src/components/SessionBlock.tsx`: una sesión individual.
- `src/data/exampleSessions.ts`: datos temporales de ejemplo.
- `src/utils/createSessions.ts`: crea la lista visible de sesiones.
- `src/utils/sessionLayout.ts`: decide cómo repartir sesiones en columnas.
- `MODELS.md`: contexto para otra IA o para retomar el proyecto.

## Próximo Paso

El siguiente paso planeado es crear el wizard de captura:

1. Elegir número de sesiones.
2. Capturar fecha y tratamientos de cada sesión.
3. Avanzar con `Siguiente` / `Anterior`.
4. Ver la preview final.
5. Imprimir o exportar a PDF en una fase posterior.

## Notas

El PDF base de referencia está fuera del repo local actual:

```txt
/Users/fernandomedellin/Downloads/bitacoraa.pdf
```

Ese PDF se usó solo como referencia visual para la maqueta.
