import { useEiqStore } from '@/state/store'

export default function ProductPicker({ onSelect }: { onSelect: (productId: string) => void }) {
  const { catalogs } = useEiqStore()
  const products = Object.values(catalogs.products || {})
  if (!products.length) return null
  return (
    <div className="flex items-center gap-2">
      <select className="input" onChange={(e) => e.target.value && onSelect(e.target.value)} aria-label="Seleccionar producto del catálogo">
        <option value="">Agregar desde catálogo…</option>
        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
    </div>
  )
}
