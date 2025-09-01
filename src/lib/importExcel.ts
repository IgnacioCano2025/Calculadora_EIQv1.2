import * as XLSX from 'xlsx'
import type { EiqInput, Catalogs } from '@/domain/eiq/types'

function toNumber(x: any): number | null {
  const n = Number(x)
  return Number.isFinite(n) ? n : null
}

export async function importFromExcel(file: File): Promise<{ input: EiqInput; catalogs: Partial<Catalogs> }> {
  const buffer = await file.arrayBuffer()
  const wb = XLSX.read(buffer, { type: 'array' })

  const sheetNames = wb.SheetNames
  const ddName = sheetNames.find(n => n.toLowerCase().includes('dropdowns')) || 'EIQ dropdowns'
  const dd = XLSX.utils.sheet_to_json<any>(wb.Sheets[ddName] || {}, { defval: null })

  const products: Record<string, any> = {}
  for (const row of dd) {
    const region = (row['RegionID'] ?? '').toString().trim()
    if (region !== 'AR') continue
    const name = (row['Product Name'] ?? '').toString().trim()
    if (!name) continue
    const id = name.toUpperCase().replace(/\s+/g, '_')
    products[id] = {
      id,
      name,
      userUom: (row['User UOM'] ?? null) && String(row['User UOM']).trim(),
      maxRateKgHa: toNumber(row['MAX rate in KG/ha']),
      conventionalRate: toNumber(row['Conventional rate']),
      percentAI: toNumber(row['%AI in product']),
      eiqPerHa_atSheetRate: toNumber(row['EIQ/ha']),
    }
  }

  // input vacío, a completar por el usuario
  const input: EiqInput = {
    producerName: '',
    fieldName: '',
    campaign: 'Campaña 25/26',
    areaHa: 1,
    products: []
  }

  return { input, catalogs: { products } }
}
