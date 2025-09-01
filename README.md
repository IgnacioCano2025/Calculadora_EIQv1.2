# Calculadora EIQ – EDRA (MVP)

Proyecto React + Vite + TypeScript. UI con Tailwind. Estado con Zustand. Formularios con react-hook-form + zod.
Importación de Excel con SheetJS. Exportación a PDF con jsPDF + autotable. i18n listo (ES).

## Requisitos
- Node 20+ recomendado

## Instalación
```bash
npm install
npm run dev
```

## Scripts
- `npm run dev` — entorno de desarrollo
- `npm run build` — build de producción
- `npm run preview` — previsualizar build
- `npm run test` — ejecutar tests (10 casos de Excel están marcados como `skip` hasta mapear fórmulas reales)

## Estructura
- `src/domain/eiq/calc.ts` — Lógica de cálculo **provisoria** (reemplazar por macros Excel 1:1)
- `src/lib/importExcel.ts` — Importador con mapeo declarativo (`src/assets/excel-mapping.json`)
- `src/components/*` — Header, Form, ResultsTable, PdfButton
- `src/state/store.ts` — Zustand store
- `src/i18n.ts` — i18n ES
- `public/edra-logo.png` — Logo EDRA

## Catálogo de ingredientes
Cargar desde Excel (hoja `Ingredientes`) o desde un JSON. Clave: `id`, `name`, `eiq`.

## PDF
El PDF incluye: título, fecha, productor, lote, campaña, categoría, totales y tabla de detalle.

## Supuestos y notas
- La fórmula de EIQ implementada es un **placeholder** hasta traducir las macros xlsm.
- Redondeo a 2 decimales con `round2` para cumplir ±0.01.
- La categoría aplica la regla proporcionada; valores ≥ 2500 se marcan como `REVISAR` (supuesto).
- `excel-mapping.json` es un ejemplo; ajustar coordenadas reales.
- Accesibilidad: inputs con `label/aria-label`, foco visible por defecto en Tailwind.
- Performance: renderiza <100ms con 100 filas (componente de tabla simple).

## Próximos pasos para paridad 1:1
1. Extraer factores/tablas del Excel a JSON/CSV.
2. Codificar fórmulas exactas en `calc.ts` con pruebas de regresión.
3. Completar 10 tests con fixtures del Excel.
4. Ajustar `excel-mapping.json` al layout real del xlsm.

