export type Catalogs = {
  /** Productos reales cargados desde la hoja "EIQ dropdowns" (Región AR) */
  products?: Record<string, ExcelProductCatalogItem>
  units: string[]
  ingredients?: Record<string, IngredientInfo> // mantenido por compatibilidad
}

export type ExcelProductCatalogItem = {
  id: string
  name: string
  userUom?: string | null
  maxRateKgHa?: number | null
  conventionalRate?: number | null
  percentAI?: number | null
  eiqPerHa_atSheetRate?: number | null
}

export type IngredientInfo = {
  id: string
  name: string
  eiq: number
}

export type ProductInput = {
  id: string
  /** Nombre EXACTO del catálogo (para resolver contra catalogs.products) */
  name: string
  /** dosis aplicada (kg/ha o L/ha según unidad) */
  dose: number
  unit: string
  /** número de aplicaciones */
  timesUsed?: number
  /** % del campo al que se aplica (0-100) */
  scenarioFieldPercent?: number,
  /** opcional para compatibilidad con tests */
  ingredients?: Array<{ ingredientId: string; percentActive: number }>
}

export type EiqInput = {
  producerName: string
  fieldName: string
  campaign: 'Campaña 25/26' | 'Campaña 26/27' | 'Campaña 27/28'
  areaHa: number
  products: ProductInput[]
}

export type ProductResult = {
  productId: string
  name: string
  /** Normal field EIQ/ha (tras escalar por dosis y usos) */
  eiq: number
  /** Scenario Field EIQ/ha (aplicando % campo) */
  eiqPerHa: number
  byIngredient: { ingredientId: string; name: string; eiq: number }[]
}

export type EiqResult = {
  totalEiq: number           // Normal field EIQ/ha
  totalEiqPerHa: number      // Scenario Field EIQ/ha
  byProduct: ProductResult[]
  category?: string
}
