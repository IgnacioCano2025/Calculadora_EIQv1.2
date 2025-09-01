import type { EiqInput, EiqResult, Catalogs, ProductResult } from './types'
import { round2 } from '@/utils/num'

/**
 * Cálculo alineado al Excel (EIQ calculator):
 * - Base: columna "EIQ/ha" del catálogo (hoja "EIQ dropdowns") => eiqPerHa_atSheetRate
 * - Escala por dosis ingresada vs tasa de referencia: conventionalRate o, si falta, MAX rate in KG/ha.
 * - Multiplica por "Nr times used".
 * - Aplica "% campo" para el escenario.
 * - Totales: sumatoria por producto.
 */
export function computeEIQ(input: EiqInput, catalogs: Catalogs): EiqResult {
  const byProduct: ProductResult[] = input.products.map(p => {
    const key = (p.name || '').toUpperCase().replace(/\s+/g, '_')
    const m = catalogs.products?.[key] as any
    const baseEiqHa = Number(m?.eiqPerHa_atSheetRate ?? 0)
    const ref = Number(m?.conventionalRate ?? m?.maxRateKgHa ?? 0)
    const dose = Number(p.dose ?? 0)
    const times = Math.max(1, Number(p.timesUsed ?? 1))
    const scenPct = Math.max(0, Math.min(100, Number(p.scenarioFieldPercent ?? 100)))

    const scale = ref > 0 && dose > 0 ? (dose / ref) : (dose > 0 ? 1 : 1)
    const normal = baseEiqHa * scale * times
    const scenario = normal * (scenPct / 100)

    return {
      productId: p.id,
      name: p.name,
      eiq: round2(normal),
      eiqPerHa: round2(scenario),
      byIngredient: []
    }
  })

  const totalNormal = byProduct.reduce((a, b) => a + b.eiq, 0)
  const totalScenario = byProduct.reduce((a, b) => a + b.eiqPerHa, 0)

  return {
    totalEiq: round2(totalNormal),
    totalEiqPerHa: round2(totalScenario),
    byProduct
  }
}
