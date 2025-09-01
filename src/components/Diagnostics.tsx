import { useEiqStore } from '@/state/store'

export default function Diagnostics() {
  const { catalogs } = useEiqStore()
  const count = Object.keys(catalogs.products || {}).length
  return (
    <div className="text-xs text-slate-600">
      Catálogo AR cargado: <span className="font-semibold">{count}</span> productos
    </div>
  )
}
