import { create } from 'zustand'
import type { EiqInput, EiqResult, Catalogs } from '@/domain/eiq/types'
import { computeEIQ } from '@/domain/eiq/calc'
import { categorize } from '@/domain/eiq/categorize'

type State = {
  input: EiqInput
  catalogs: Catalogs
  result: EiqResult | null
  setInput: (p: Partial<EiqInput>) => void
  setCatalogs: (c: Partial<Catalogs>) => void
  recalc: () => void
  reset: () => void
}

const empty: EiqInput = {
  producerName: '',
  fieldName: '',
  campaign: 'Campaña 25/26',
  areaHa: 1,
  products: []
}

const defaultCatalogs: Catalogs = {
  products: {},
  units: ['L/ha','KG/HA','lt/ha','kg/ha']
}

export const useEiqStore = create<State>((set, get) => ({
  input: empty,
  catalogs: defaultCatalogs,
  result: null,
  setInput: (p) => set({ input: { ...get().input, ...p } }),
  setCatalogs: (c) => set({ catalogs: { ...get().catalogs, ...c } }),
  recalc: () => {
    const { input, catalogs } = get()
    const result = computeEIQ(input, catalogs)
    const category = categorize(result.totalEiqPerHa)
    set({ result: { ...result, category } })
  },
  reset: () => set({ input: empty, result: null }),
}))
