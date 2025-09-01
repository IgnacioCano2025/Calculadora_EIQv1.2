import { describe, it, expect, test } from 'vitest'
import { computeEIQ } from '../src/domain/eiq/calc'
import { categorize } from '../src/domain/eiq/categorize'
import type { EiqInput, Catalogs } from '../src/domain/eiq/types'

const catalogs: Catalogs = {
  ingredients: {
    ING1: { id: 'ING1', name: 'Ingrediente 1', eiq: 10 },
    ING2: { id: 'ING2', name: 'Ingrediente 2', eiq: 20 },
    ING3: { id: 'ING3', name: 'Ingrediente 3', eiq: 5 }
  },
  units: ['L/ha']
}

describe('computeEIQ (provisorio)', () => {
  it('suma por producto y total', () => {
    const input: EiqInput = {
      producerName: 'Demo', fieldName: 'Lote A', campaign: 'Campaña 25/26', areaHa: 10,
      products: [
        { id: 'p1', name: 'Prod 1', dose: 2, unit: 'L/ha', ingredients: [{ ingredientId: 'ING1', percentActive: 50 }] },
        { id: 'p2', name: 'Prod 2', dose: 1, unit: 'L/ha', ingredients: [{ ingredientId: 'ING2', percentActive: 100 }] }
      ]
    }
    const r = computeEIQ(input, catalogs)
    expect(r.totalEiq).toBeCloseTo( (10*0.5*2) + (20*1), 2)
    expect(r.totalEiqPerHa).toBeCloseTo(r.totalEiq/10, 2)
    expect(categorize(r.totalEiq)).toBeDefined()
  })

  // 10 casos de verificación contra Excel (a completar)
  for (let i = 1; i <= 10; i++) {
    test.skip(`caso_excel_${i}`, () => {
      // Reemplazar con fixtures del Excel: input y resultado esperado
      // expect(r.totalEiq).toBeCloseTo(expected, 2)
    })
  }
})
